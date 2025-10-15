import { PuzzleData, Difficulty, CellState } from '../types/nonogram';

// ... (createRandomBinaryGrid and getCluesForLine functions are unchanged)
const createRandomBinaryGrid = (width: number, height: number, density: number = 0.5): number[][] => {
  const grid: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      row.push(Math.random() < density ? 1 : -1);
    }
    grid.push(row);
  }
  return grid;
};
const getCluesForLine = (line: number[]): string[] => {
  const clues: number[] = [];
  let count = 0;
  for (const cell of line) {
    if (cell === 1) {
      count++;
    } else if (count > 0) {
      clues.push(count);
      count = 0;
    }
  }
  if (count > 0) clues.push(count);
  return clues.length > 0 ? clues.map(String) : ['0'];
};


export const generateRandomPuzzle = (width: number, height: number, difficulty: Difficulty) => {
  const solutionGrid = createRandomBinaryGrid(width, height);

  // ... (clue generation logic is unchanged)
  const rowClues: string[][] = [];
  for (let i = 0; i < height; i++) {
    rowClues.push(getCluesForLine(solutionGrid[i]));
  }
  const colClues: string[][] = [];
  for (let j = 0; j < width; j++) {
    const column = solutionGrid.map(row => row[j]);
    colClues.push(getCluesForLine(column));
  }
  const maxGroups = Math.max(1, ...rowClues.map(c => c.length), ...colClues.map(c => c.length));
  const paddedRowClues = rowClues.map(c => [...c, ...Array(maxGroups - c.length).fill('')]);
  const paddedColClues = colClues.map(c => [...c, ...Array(maxGroups - c.length).fill('')]);

  const puzzleData: PuzzleData = {
    gridSize: { rows: height, cols: width },
    maxGroups,
    clues: { rows: paddedRowClues, cols: paddedColClues },
  };

  // ... (initial grid generation is unchanged)
  const initialGrid: CellState[][] = Array.from({ length: height }, () => Array(width).fill(0));
  const difficultyMap = { Guided: 0.66, Explorer: 0.33, Architect: 0 };
  const hintPercentage = difficultyMap[difficulty];
  if (hintPercentage > 0) {
    const emptyCells: { r: number, c: number }[] = [];
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        if (solutionGrid[r][c] === -1) {
          emptyCells.push({ r, c });
        }
      }
    }
    emptyCells.sort(() => 0.5 - Math.random());
    const hintsToPlace = Math.floor(emptyCells.length * hintPercentage);
    for (let i = 0; i < hintsToPlace; i++) {
      const { r, c } = emptyCells[i];
      initialGrid[r][c] = -1;
    }
  }
  

  // FIXED: The property name is now 'solution' instead of 'solutionGrid'
  return { puzzleData, initialGrid, solution: solutionGrid as CellState[][] };
};