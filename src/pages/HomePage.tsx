import React from 'react';
import PageHeader from '../components/shared/PageHeader';
import Card from '../components/shared/Card';
import NeoButton from '../components/shared/NeoButton';
import { Wrench, Image, Gamepad2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main className="container mx-auto flex flex-col items-center animate-slide-in">
      <PageHeader
        title="Welcome to Nonogram World"
        subtitle="Create, solve, and play picture-logic puzzles!"
      />
      <div className="mt-12 w-full max-w-5xl">
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 text-center">
            {/* Solver Section */}
            <div className="flex flex-col items-center space-y-4 p-4 rounded-lg">
              <Wrench size={48} className="text-yellow-500" />
              <h3 className="text-2xl font-bold">The Solver</h3>
              <p className="text-gray-600 min-h-[96px]">
                A powerful workshop. Input your own clues, check for solutions, and verify puzzle logic instantly.
              </p>
              <NeoButton onClick={() => onNavigate('/solver')} variant="primary" className="w-full">
                Go to Solver
              </NeoButton>
            </div>

            {/* Maker Section */}
            <div className="flex flex-col items-center space-y-4 p-4 rounded-lg">
              <Image size={48} className="text-pink-500" />
              <h3 className="text-2xl font-bold">The Maker</h3>
              <p className="text-gray-600 min-h-[96px]">
                Unleash your creativity! Turn any image into a fully playable nonogram puzzle for others to solve.
              </p>
              <NeoButton onClick={() => onNavigate('/maker')} variant="secondary" className="w-full">
                Go to Maker
              </NeoButton>
            </div>

            {/* Game Section */}
            <div className="flex flex-col items-center space-y-4 p-4 rounded-lg">
              <Gamepad2 size={48} className="text-cyan-500" />
              <h3 className="text-2xl font-bold">The Game</h3>
              <p className="text-gray-600 min-h-[96px]">
                Ready to play? Solve puzzles created by the community or puzzles you've made yourself.
              </p>
              <NeoButton onClick={() => onNavigate('/game')} variant="accent" className="w-full">
                Play a Game
              </NeoButton>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default HomePage;