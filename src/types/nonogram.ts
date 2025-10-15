// ... (other types remain the same)
export type CellState = 0 | 1 | -1;
export type NonogramClues = string[][];
export interface PuzzleData {
  gridSize: { rows: number; cols: number };
  maxGroups: number;
  clues: { rows: NonogramClues; cols: NonogramClues };
}
export type Page = 'home' | 'solver' | 'maker' | 'game';

// NEW: Add our creative difficulty names
export type Difficulty = 'Guided' | 'Explorer' | 'Architect';