import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { decodePuzzle } from '../lib/urlEncoder';
import { useNonogramGame } from '../hooks/useNonogramGame';
import NonogramGrid from '../components/features/nonogram-solver/NonogramGrid';
import NeoButton from '../components/shared/NeoButton';
import { RefreshCw, CheckCircle } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';

const PlayPage: React.FC = () => {
  const { encodedData } = useParams<{ encodedData: string }>();
  const [decodedPuzzle, setDecodedPuzzle] = useState<ReturnType<typeof decodePuzzle>>(null);
  
  // The useNonogramGame hook is perfect for this page's logic
  const { grid, puzzle, isComplete, toggleCellState, resetGrid, checkSolution } = useNonogramGame(decodedPuzzle);

  useEffect(() => {
    if (encodedData) {
      setDecodedPuzzle(decodePuzzle(encodedData));
    }
  }, [encodedData]);

  if (!puzzle) {
    return (
      <div className="container mx-auto flex flex-col items-center p-8">
        <PageHeader title="Invalid Puzzle" subtitle="This link may be broken or expired." />
      </div>
    );
  }
  
  // The grand finale: show the original image when the puzzle is complete
  if (isComplete && decodedPuzzle) {
      return (
        <div className="container mx-auto flex flex-col items-center p-8 animate-fade-in-down">
            <PageHeader title="Puzzle Solved!" subtitle="Here's the hidden picture:" />
            <img 
                src={decodedPuzzle.imageDataUrl} 
                alt="Solved Puzzle" 
                className="mt-8 rounded-lg border-4 border-black shadow-neo-lg"
            />
        </div>
      )
  }

  return (
    <main className="container mx-auto flex flex-col items-center">
      <PageHeader
        title="A Shared Puzzle"
        subtitle="Solve the puzzle to reveal the hidden image!"
      />
      <div className="mt-8 flex w-full max-w-5xl flex-col items-center gap-8">
        <div className="flex items-center justify-center gap-4">
          <NeoButton variant="secondary" onClick={resetGrid}>
            <RefreshCw /> Reset
          </NeoButton>
          <NeoButton variant="primary" onClick={checkSolution}>
            <CheckCircle /> Check
          </NeoButton>
        </div>

        <NonogramGrid
          grid={grid}
          clues={puzzle.clues}
          onCellClick={toggleCellState}
          onClueChange={() => {}}
          isReadOnly={true}
        />
      </div>
    </main>
  );
};

export default PlayPage;