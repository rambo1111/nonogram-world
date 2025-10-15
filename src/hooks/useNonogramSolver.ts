import { useState, useCallback, useEffect } from 'react';
import { Nonogram } from '../lib/nonogram';
import { CellState, NonogramClues, PuzzleData } from '../types/nonogram';

const createEmptyGrid = (rows: number, cols: number): CellState[][] => {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
};
const createEmptyClues = (rows: number, cols: number, maxGroups: number): { rows: NonogramClues; cols: NonogramClues } => {
    return {
        rows: Array.from({ length: rows }, () => Array(maxGroups).fill('')),
        cols: Array.from({ length: cols }, () => Array(maxGroups).fill('')),
    }
}
const parseClues = (clues: { rows: NonogramClues; cols: NonogramClues }): { rows: number[][]; cols: number[][] } => {
    const parseGroup = (group: string[]) => group.map(s => parseInt(s, 10)).filter(n => !isNaN(n) && n > 0);
    return {
        rows: clues.rows.map(parseGroup),
        cols: clues.cols.map(parseGroup),
    };
};

export const useNonogramSolver = (initialPuzzle: PuzzleData | null) => {
  // FIXED: Added the missing '=' sign here
  const [gridSize, setGridSize] = useState(initialPuzzle?.gridSize || { rows: 5, cols: 5 });
  const [maxGroups, setMaxGroups] = useState(initialPuzzle?.maxGroups || 5);
  const [clues, setClues] = useState<{ rows: NonogramClues; cols: NonogramClues }>(initialPuzzle?.clues || createEmptyClues(5, 5, 5));
  const [grid, setGrid] = useState<CellState[][]>(() => createEmptyGrid(gridSize.rows, gridSize.cols));
  const [isSolved, setIsSolved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPuzzle) {
        setGridSize(initialPuzzle.gridSize);
        setMaxGroups(initialPuzzle.maxGroups);
        setClues(initialPuzzle.clues);
        setGrid(createEmptyGrid(initialPuzzle.gridSize.rows, initialPuzzle.gridSize.cols));
        setIsSolved(false);
        setError(null);
    }
  }, [initialPuzzle]);

  const solvePuzzle = useCallback(() => {
    try {
      setError(null);
      const parsed = parseClues(clues);
      const nonogram = new Nonogram(parsed.rows, parsed.cols);
      const success = nonogram.solve();
      if (success) {
        setGrid(nonogram.matrix);
        setIsSolved(nonogram.isComplete());
      } else {
        setError("This puzzle is impossible to solve.");
      }
    } catch (e) {
      setError("An unexpected error occurred during solving.");
    }
  }, [clues]);
  
  const updateSettings = useCallback((newRows: number, newCols: number, newMaxGroups: number) => {
    const rows = Math.max(1, Math.min(30, newRows));
    const cols = Math.max(1, Math.min(30, newCols));
    const groups = Math.max(1, Math.min(15, newMaxGroups));
    setGridSize({ rows, cols });
    setMaxGroups(groups);
    setClues(createEmptyClues(rows, cols, groups));
    setGrid(createEmptyGrid(rows, cols));
    setError(null);
    setIsSolved(false);
  }, []);
  
  const reset = useCallback(() => {
    updateSettings(gridSize.rows, gridSize.cols, maxGroups);
  }, [gridSize, maxGroups, updateSettings]);

  const handleClueChange = useCallback((axis: 'rows' | 'cols', lineIndex: number, groupIndex: number, value: string) => {
    const newClues = { ...clues };
    newClues[axis][lineIndex][groupIndex] = value.replace(/[^0-9]/g, '');
    setClues(newClues);
  }, [clues]);

  return { grid, clues, gridSize, maxGroups, isSolved, error, solvePuzzle, reset, updateSettings, handleClueChange };
};