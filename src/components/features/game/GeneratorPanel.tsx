import React, { useState } from 'react';
import Card from '../../shared/Card';
import NeoButton from '../../shared/NeoButton';
import { Difficulty } from '../../../types/nonogram';

interface GeneratorPanelProps {
  onGenerate: (width: number, height: number, difficulty: Difficulty) => void;
}

const GeneratorPanel: React.FC<GeneratorPanelProps> = ({ onGenerate }) => {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty>('Explorer');

  const difficulties: { name: Difficulty, color: 'accent' | 'primary' | 'secondary' }[] = [
      { name: 'Guided', color: 'accent' },
      { name: 'Explorer', color: 'primary' },
      { name: 'Architect', color: 'secondary' },
  ];

  return (
    <Card>
      <div className="space-y-6 text-center">
        <h3 className="text-2xl font-bold">Generate a Random Puzzle</h3>
        
        {/* Difficulty Selector */}
        <div>
            <label className="font-bold text-lg mb-2 block">Difficulty</label>
            <div className="flex justify-center gap-2">
                {difficulties.map(d => (
                    <NeoButton
                        key={d.name}
                        onClick={() => setDifficulty(d.name)}
                        variant={difficulty === d.name ? d.color : undefined}
                        className={difficulty !== d.name ? 'bg-gray-200 hover:bg-gray-300' : ''}
                    >
                        {d.name}
                    </NeoButton>
                ))}
            </div>
        </div>

        {/* Dimension Sliders */}
        <div>
          <label className="font-bold text-lg">Dimensions</label>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-semibold">Width:</span>
            <input type="range" min="5" max="25" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} className="w-full" />
            <span className="font-bold w-8 text-center">{width}</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-semibold">Height:</span>
            <input type="range" min="5" max="25" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="w-full" />
            <span className="font-bold w-8 text-center">{height}</span>
          </div>
        </div>

        <NeoButton onClick={() => onGenerate(width, height, difficulty)} className="w-full text-xl py-3">
          Generate & Play
        </NeoButton>
      </div>
    </Card>
  );
};

export default GeneratorPanel;