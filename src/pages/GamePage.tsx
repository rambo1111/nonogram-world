import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/shared/PageHeader';
import NonogramGrid from '../components/features/nonogram-solver/NonogramGrid';
import { useNonogramGame } from '../hooks/useNonogramGame';
import { PuzzleData } from '../types/nonogram';
import Card from '../components/shared/Card';
import NeoButton from '../components/shared/NeoButton';
import { RefreshCw, CheckCircle, XCircle, PlusSquare, Send } from 'lucide-react';
import GeneratorPanel from '../components/features/game/GeneratorPanel';

const GamePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialPuzzle = location.state?.puzzle as PuzzleData | null;
  
  const { grid, puzzle, isComplete, toggleCellState, resetGrid, checkSolution, generateNewPuzzle, clearPuzzle } = useNonogramGame(initialPuzzle);
  
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  useEffect(() => {
    if (feedback.message) {
      setIsFeedbackVisible(true);
      const timer = setTimeout(() => setIsFeedbackVisible(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleCheck = () => {
    const isCorrect = checkSolution();
    if (isCorrect) {
      setFeedback({ message: '🎉 Congratulations! You solved it! 🎉', type: 'success' });
    } else {
      setFeedback({ message: 'Not quite right. Keep trying!', type: 'error' });
    }
  };

  if (!puzzle) {
    return (
      <main className="container mx-auto flex flex-col items-center">
        <PageHeader title="Nonogram Game" subtitle="Generate a random puzzle to begin!" />
        <div className="mt-8 w-full max-w-lg">
          <GeneratorPanel onGenerate={generateNewPuzzle} />
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto flex flex-col items-center">
      <PageHeader title="Nonogram Game" subtitle="Left-click to fill, Right-click to mark 'X'"/>
      <div className="mt-8 flex w-full max-w-5xl flex-col items-center gap-8">
        <div className="flex items-center justify-center gap-2 flex-wrap">
            <NeoButton variant="accent" onClick={clearPuzzle}><PlusSquare /> New Game</NeoButton>
            <NeoButton variant="secondary" onClick={resetGrid}> <RefreshCw /> Reset Board </NeoButton>
            <NeoButton variant="primary" onClick={handleCheck} disabled={isComplete}> <CheckCircle /> Check Puzzle </NeoButton>
            {/* FIXED: Use the new "neutral" variant instead of a custom className */}
            <NeoButton variant="neutral" onClick={() => navigate('/solver', { state: { puzzle } })}><Send /> See Solution</NeoButton>
        </div>
        
        {feedback.message && isFeedbackVisible && (
          <div className={isFeedbackVisible ? 'animate-fade-in-down' : 'animate-fade-out'}>
            <Card className={feedback.type === 'success' ? 'bg-green-100 border-green-400' : 'bg-pink-100 border-pink-400'}>
              <div className="flex items-center justify-center gap-2 font-bold text-xl">
                {feedback.type === 'error' && <XCircle className="text-pink-600" />}
                <span className={feedback.type === 'success' ? 'text-green-700' : 'text-pink-700'}>
                  {feedback.message}
                </span>
              </div>
            </Card>
          </div>
        )}

        <NonogramGrid grid={grid} clues={puzzle.clues} onCellClick={toggleCellState} onClueChange={() => {}} isReadOnly={true} isComplete={isComplete} />
      </div>
    </main>
  );
};

export default GamePage;