import React from 'react';
import Card from '../../shared/Card';
import NeoButton from '../../shared/NeoButton';

interface OptionsPanelProps {
  onGenerate: () => void;
  width: number;
  setWidth: (n: number) => void;
  height: number;
  setHeight: (n: number) => void;
  threshold: number;
  setThreshold: (n: number) => void;
  isDisabled: boolean;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({
  onGenerate,
  width,
  setWidth,
  height,
  setHeight,
  threshold,
  setThreshold,
  isDisabled,
}) => {
  return (
    <Card>
      <div className="space-y-6">
        <div>
          <label className="font-bold text-lg">Puzzle Dimensions</label>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-semibold">W:</span>
            <input type="range" min="5" max="50" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} className="w-full" />
            <span className="font-bold w-8 text-center">{width}</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-semibold">H:</span>
            <input type="range" min="5" max="50" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="w-full" />
            <span className="font-bold w-8 text-center">{height}</span>
          </div>
        </div>
        <div>
          <label className="font-bold text-lg">Black/White Threshold</label>
           <div className="flex items-center gap-4 mt-2">
            <input type="range" min="1" max="254" value={threshold} onChange={(e) => setThreshold(parseInt(e.target.value))} className="w-full" />
            <span className="font-bold w-12 text-center">{threshold}</span>
          </div>
        </div>
        <NeoButton onClick={onGenerate} disabled={isDisabled} className="w-full text-xl py-3">
          Generate Puzzle
        </NeoButton>
      </div>
    </Card>
  );
};

export default OptionsPanel;