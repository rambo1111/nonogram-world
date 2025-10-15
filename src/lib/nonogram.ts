import { CellState } from "../types/nonogram"; // Import CellState type

function create1DArray(size: number): number[] {
  return new Array(size).fill(0);
}

function create2DArray(rows: number, cols: number): CellState[][] {
  const array: CellState[][] = [];
  while (rows--) {
    array.push(new Array(cols).fill(0));
  }
  return array;
}

class Line {
  private groups: number[];
  private gn: number;
  private restLength: number[];
  private length = 0;
  private cells: CellState[] = [];
  private sure: number[] = [];
  private cur: CellState[] = [];
  // FIXED: This line now uses a more specific type to allow the number 2
  private ansLine: (CellState | 2)[] = [];
  private realFound = 0;
  
  //... constructor and other methods remain the same
  constructor(groups: number[]) {
    this.groups = groups;
    this.gn = groups.length;

    if (this.gn > 0) {
      this.restLength = create1DArray(this.gn);
      this.restLength[this.gn - 1] = groups[this.gn - 1];
      for (let i = this.gn - 2; i >= 0; i--) {
        this.restLength[i] = groups[i] + 1 + this.restLength[i + 1];
      }
    } else {
        this.restLength = [];
    }
  }

  setCells(cells: CellState[]) {
    this.length = cells.length;
    this.cells = cells;
    this.sure = create1DArray(this.length);
    for (let i = 0; i < this.length; i++) {
      if (this.cells[i] !== 0) this.sure[i] = 1;
    }
    this.cur = create1DArray(this.length) as CellState[];
    this.ansLine = create1DArray(this.length) as (CellState | 2)[];
  }

  private checkFinal(pos: number) {
    for (let i = pos; i < this.length; i++) {
      if (this.cells[i] === 1) return;
    }
    for (let i = 0; i < this.length; i++) {
      if (this.ansLine[i] === 0) {
        this.ansLine[i] = this.cur[i];
      } else if (this.ansLine[i] !== this.cur[i]) {
        this.ansLine[i] = 2;
        this.cells[i] = 0;
        this.sure[i] = 1;
      }
    }
    this.realFound++;
  }

  private rec(g: number, pos: number) {
    if (this.realFound > 0) return;
    if (g >= this.gn || pos + this.restLength[g] > this.length) return;

    let ok = true;
    for (let i = pos; i < pos + this.groups[g]; i++) {
      if (this.cells[i] === -1) {
        ok = false;
        break;
      }
      this.cur[i] = 1;
    }

    if (pos + this.groups[g] < this.length && this.cells[pos + this.groups[g]] === 1) {
      ok = false;
    }

    if (ok) {
      if (g === this.gn - 1) {
        this.checkFinal(pos + this.groups[g]);
      } else {
        for (let i = pos + this.groups[g] + 1; i < this.length; ++i) {
          this.rec(g + 1, i);
          if (this.cells[i] === 1) break;
        }
      }
    }

    for (let i = pos; i < pos + this.groups[g]; i++) {
      this.cur[i] = 0;
    }
  }

  private isFeasible(): boolean {
    if (this.gn === 0) {
      for (let i = 0; i < this.length; ++i) {
        if (this.cells[i] === 1) return false;
      }
      return true;
    }

    this.realFound = 0;
    for (let i = 0; i < this.length; ++i) {
      this.rec(0, i);
      if (this.cells[i] === 1) break;
    }
    return this.realFound !== 0;
  }

  private isModificationFeasible(pos: number, val: CellState): boolean {
    if (this.ansLine[pos] === 2 || this.ansLine[pos] === val) return true;
    const tmp = this.cells[pos];
    this.cells[pos] = val;
    const ans = this.isFeasible();
    this.cells[pos] = tmp;
    return ans;
  }

  solve(): boolean {
    if (!this.isFeasible()) return false;
    for (let i = 0; i < this.length; ++i) {
      if (this.sure[i] === 1) continue;
      if (!this.isModificationFeasible(i, 1)) {
        this.cells[i] = -1;
      } else if (!this.isModificationFeasible(i, -1)) {
        this.cells[i] = 1;
      } else {
        this.cells[i] = 0;
      }
      this.sure[i] = 1;
    }
    return true;
  }

  getCells(): CellState[] {
    return this.cells;
  }
}

export class Nonogram {
  public matrix: CellState[][];
  private width: number;
  private height: number;
  private rows: Line[];
  private columns: Line[];
  private changed = false;

  constructor(groupsHor: number[][], groupsVert: number[][]) {
    this.width = groupsVert.length;
    this.height = groupsHor.length;
    this.matrix = create2DArray(this.height, this.width);
    this.rows = groupsHor.map(g => new Line(g));
    this.columns = groupsVert.map(g => new Line(g));
  }

  private getColumn(j: number): CellState[] {
    const ans: CellState[] = [];
    for (let i = 0; i < this.height; i++) {
      ans.push(this.matrix[i][j]);
    }
    return ans;
  }

  private updateMatrix(x: number, y: number, value: CellState) {
    if (this.matrix[x][y] === 0 && value !== 0) {
      this.matrix[x][y] = value;
      this.changed = true;
    }
  }

  isComplete(): boolean {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.matrix[i][j] === 0) return false;
      }
    }
    return true;
  }

  solve(): boolean {
    do {
      this.changed = false;
      for (let i = 0; i < this.height; i++) {
        this.rows[i].setCells(this.matrix[i]);
        if (!this.rows[i].solve()) return false;
        const newRowCells = this.rows[i].getCells();
        for (let j = 0; j < this.width; j++) {
          this.updateMatrix(i, j, newRowCells[j]);
        }
      }

      for (let i = 0; i < this.width; i++) {
        this.columns[i].setCells(this.getColumn(i));
        if (!this.columns[i].solve()) return false;
        const newColCells = this.columns[i].getCells();
        for (let j = 0; j < this.height; j++) {
          this.updateMatrix(j, i, newColCells[j]);
        }
      }
    } while (this.changed);
    return true;
  }
}