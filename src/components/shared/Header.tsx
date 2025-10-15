import React from 'react';
import NeoButton from './NeoButton';
import { useLocation } from 'react-router-dom';
import { Gamepad2, Wrench, Image, Home } from 'lucide-react';

// FIXED: Define the props interface to accept the onNavigate function
interface HeaderProps {
  onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const location = useLocation();
  const currentPage = location.pathname;

  // Don't render anything if we're on the homepage
  if (currentPage === '/') {
    return null;
  }

  return (
    <header className="flex items-center justify-between w-full mb-8">
      <NeoButton onClick={() => onNavigate('/')} variant="secondary" className="!p-3 !rounded-full">
        <Home size={24} />
      </NeoButton>
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <NeoButton onClick={() => onNavigate('/solver')} variant={currentPage === '/solver' ? 'primary' : 'secondary'} className="text-lg sm:text-xl px-4 sm:px-6 py-3">
          <Wrench size={20} /> Solver
        </NeoButton>
        <NeoButton onClick={() => onNavigate('/maker')} variant={currentPage === '/maker' ? 'primary' : 'secondary'} className="text-lg sm:text-xl px-4 sm:px-6 py-3">
          <Image size={20} /> Maker
        </NeoButton>
        <NeoButton onClick={() => onNavigate('/game')} variant={currentPage === '/game' ? 'primary' : 'secondary'} className="text-lg sm:text-xl px-4 sm:px-6 py-3">
          <Gamepad2 size={20} /> Game
        </NeoButton>
      </div>
      <div className="w-12 h-12"></div>
    </header>
  );
};

export default Header;