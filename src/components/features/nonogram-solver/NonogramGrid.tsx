import React from 'react';
import Card from '../../shared/Card';
import { X } from 'lucide-react';
import { CellState, NonogramClues } from '../../../types/nonogram';

interface NonogramGridProps {
  grid: CellState[][];
  clues: { rows: NonogramClues; cols: NonogramClues };
  onCellClick: (row: number, col: number, button: 'left' | 'right') => void;
  // FIXED: onClueChange is now optional
  onClueChange?: (axis: 'rows' | 'cols', lineIndex: number, groupIndex: number, value: string) => void;
  isReadOnly?: boolean;
  isComplete?: boolean;
}

const NonogramGrid: React.FC<NonogramGridProps> = ({ grid, clues, onCellClick, onClueChange, isReadOnly = false, isComplete = false }) => {
  // ... Component logic is unchanged
  const numRows = clues.rows.length;
  const numCols = clues.cols.length;
  
  const handleCellClick = (row: number, col: number, button: 'left' | 'right') => {
    if (isComplete) return; 
    onCellClick(row, col, button);
  };

  const handleContextMenu = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (isComplete) return;
    onCellClick(row, col, 'right');
  };

  const gridContainerStyles = {
    display: 'inline-grid',
    gridTemplateColumns: `auto repeat(${numCols}, minmax(0, 1fr))`,
    gridTemplateRows: `auto repeat(${numRows}, minmax(0, 1fr))`,
  };

  return (
    <Card className="p-4 sm:p-6 overflow-x-auto">
      <div style={gridContainerStyles}>
        <div className="bg-gray-200" style={{ gridRow: 1, gridColumn: 1 }}></div>

        {clues.cols.map((colClues, colIndex) => (
          <div key={`col-clue-${colIndex}`} className="flex flex-col items-stretch justify-end bg-gray-200 border-l border-b" style={{ gridRow: 1, gridColumn: colIndex + 2, borderColor: '#d1d5db' }}>
            {colClues.map((clue, groupIndex) => ( <input key={groupIndex} type="text" value={clue} readOnly={isReadOnly} onChange={(e) => onClueChange?.('cols', colIndex, groupIndex, e.target.value)} className="w-8 sm:w-10 min-h-[2rem] p-1 text-center font-bold bg-transparent outline-none border-t border-gray-300"/> ))}
          </div>
        ))}

        {clues.rows.map((rowClues, rowIndex) => (
          <div key={`row-clue-${rowIndex}`} className="flex items-center justify-end bg-gray-200 border-l border-b" style={{ gridRow: rowIndex + 2, gridColumn: 1, borderColor: '#d1d5db' }}>
            {rowClues.map((clue, groupIndex) => ( <input key={groupIndex} type="text" value={clue} readOnly={isReadOnly} onChange={(e) => onClueChange?.('rows', rowIndex, groupIndex, e.target.value)} className="w-8 min-w-0 h-8 sm:h-10 p-1 text-center font-bold bg-transparent outline-none border-l border-gray-300"/> ))}
          </div>
        ))}

        {grid.map((row, rowIndex) =>
          row.map((cellState, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex, 'left')}
              onContextMenu={(e) => handleContextMenu(e, rowIndex, colIndex)}
              className="w-8 h-8 sm:w-10 flex items-center justify-center border-l border-b"
              style={{
                cursor: isReadOnly || isComplete ? 'default' : 'pointer',
                gridRow: rowIndex + 2,
                gridColumn: colIndex + 2,
                borderColor: (rowIndex % 5 === 4 || colIndex % 5 === 4) ? '#9ca3af' : '#d1d5db',
                borderBottomColor: rowIndex % 5 === 4 ? '#9ca3af' : '#d1d5db',
                borderLeftColor: colIndex % 5 === 4 ? '#9ca3af' : '#d1d5db',
                backgroundColor: cellState === 1 ? '#000' : '#fff',
              }}
            >
              {cellState === -1 && <X className="text-gray-500" size={24} />}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default NonogramGrid;