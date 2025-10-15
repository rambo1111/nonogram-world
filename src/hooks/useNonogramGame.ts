import { useState, useCallback, useEffect } from 'react';
import { CellState, PuzzleData, Difficulty } from '../types/nonogram';
// FIXED: Import the Nonogram solver engine
import { Nonogram } from '../lib/nonogram';
import { generateRandomPuzzle } from '../lib/puzzleGenerator';

interface GamePackage {
  puzzleData: PuzzleData;
  initialGrid: CellState[][];
  solution: CellState[][];
}

// This helper function was missing but is needed for the fix
const parseCluesForEngine = (clues: { rows: string[][]; cols: string[][] }) => {
    const parseGroup = (group: string[]) => group.map(s => parseInt(s, 10)).filter(n => !isNaN(n) && n > 0);
    return {
        rows: clues.rows.map(parseGroup),
        cols: clues.cols.map(parseGroup),
    };
};

const createEmptyGrid = (rows: number, cols: number): CellState[][] => {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
};

export const useNonogramGame = (initialPuzzle: PuzzleData | null) => {
  const [gamePackage, setGamePackage] = useState<GamePackage | null>(null);
  const { grid, puzzle, isComplete, toggleCellState, resetGrid, checkSolution } = useInternalGameLogic(gamePackage);

  useEffect(() => {
    // This is the core of the fix. It now handles puzzles from the Maker correctly.
    if (initialPuzzle) {
        // 1. Calculate the correct solution for the incoming puzzle's clues.
        const parsedClues = parseCluesForEngine(initialPuzzle.clues);
        const solver = new Nonogram(parsedClues.rows, parsedClues.cols);
        let solutionGrid: CellState[][] | null = null;
        if (solver.solve()) {
            solutionGrid = solver.matrix;
        }

        // 2. Create an empty grid for the player to start with.
        const initialGrid = createEmptyGrid(initialPuzzle.gridSize.rows, initialPuzzle.gridSize.cols);

        // 3. Set the complete game package.
        if (solutionGrid) {
            setGamePackage({
                puzzleData: initialPuzzle,
                initialGrid: initialGrid,
                solution: solutionGrid,
            });
        }
    }
  }, [initialPuzzle]);

  const generateNewPuzzle = useCallback((width: number, height: number, difficulty: Difficulty) => {
    const newGamePackage = generateRandomPuzzle(width, height, difficulty);
    setGamePackage(newGamePackage);
  }, []);

  const clearPuzzle = useCallback(() => {
    setGamePackage(null);
  }, []);

  return { grid, puzzle, isComplete, toggleCellState, resetGrid, checkSolution, generateNewPuzzle, clearPuzzle };
};

// This internal hook remains unchanged
const useInternalGameLogic = (gamePackage: GamePackage | null) => {
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(gamePackage?.puzzleData || null);
  const [grid, setGrid] = useState<CellState[][]>(gamePackage?.initialGrid || []);
  const [solution, setSolution] = useState<CellState[][] | null>(gamePackage?.solution || null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (gamePackage) {
      setPuzzle(gamePackage.puzzleData);
      setGrid(gamePackage.initialGrid);
      setSolution(gamePackage.solution);
      setIsComplete(false);
    } else {
      setPuzzle(null);
      setGrid([]);
      setSolution(null);
      setIsComplete(false);
    }
  }, [gamePackage]);

  const toggleCellState = useCallback((row: number, col: number, button: 'left' | 'right') => {
    if (isComplete) return;
    const newGrid = grid.map(r => [...r]);
    const currentState = newGrid[row][col];
    if (button === 'left') newGrid[row][col] = currentState === 1 ? 0 : 1;
    else if (button === 'right') newGrid[row][col] = currentState === -1 ? 0 : -1;
    setGrid(newGrid);
  }, [grid, isComplete]);

  const resetGrid = useCallback(() => {
    if (gamePackage) {
      setGrid(gamePackage.initialGrid);
      setIsComplete(false);
    }
  }, [gamePackage]);

  const checkSolution = useCallback(() => {
    if (!solution || isComplete) return false;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const userCell = grid[i][j] === 0 ? -1 : grid[i][j];
        if (userCell !== solution[i][j]) return false;
      }
    }
    setIsComplete(true);
    return true;
  }, [grid, solution, isComplete]);

  return { grid, puzzle, isComplete, toggleCellState, resetGrid, checkSolution };
};