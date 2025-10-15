import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ControlPanel from "../components/features/nonogram-solver/ControlPanel";
import NonogramGrid from "../components/features/nonogram-solver/NonogramGrid";
import PageHeader from "../components/shared/PageHeader";
import { useNonogramSolver } from "../hooks/useNonogramSolver";
import Card from '../components/shared/Card';
import NeoButton from '../components/shared/NeoButton';

const SolverPage: React.FC = () => {
  const location = useLocation();
  const initialPuzzle = location.state?.puzzle || null;

  const { grid, clues, gridSize, maxGroups, solvePuzzle, reset, updateSettings, handleClueChange } = useNonogramSolver(initialPuzzle);
  
  const [settings, setSettings] = useState({ rows: gridSize.rows, cols: gridSize.cols, maxGroups: maxGroups });

  useEffect(() => {
    setSettings({ rows: gridSize.rows, cols: gridSize.cols, maxGroups: maxGroups });
  }, [gridSize, maxGroups]);

  const handleApplySettings = () => {
    updateSettings(settings.rows, settings.cols, settings.maxGroups);
  };

  return (
    <main>
      <PageHeader title="Nonogram Solver" subtitle="Define a puzzle and see the solution" />
       <div className="mt-8 flex w-full max-w-5xl flex-col items-center gap-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <Card>
                <h3 className="text-2xl font-bold mb-4 text-center">Controls</h3>
                <ControlPanel onSolve={solvePuzzle} onReset={reset} />
            </Card>
            <Card>
                <h3 className="text-2xl font-bold mb-4">Settings</h3>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1 w-full">
                        <label className="font-bold">Width</label>
                        <input type="number" value={settings.cols} onChange={(e) => setSettings(s => ({ ...s, cols: parseInt(e.target.value, 10) || 1 }))} className="mt-1 w-full p-2 border-2 border-black rounded-lg" min="1" max="30" />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="font-bold">Height</label>
                        <input type="number" value={settings.rows} onChange={(e) => setSettings(s => ({ ...s, rows: parseInt(e.target.value, 10) || 1 }))} className="mt-1 w-full p-2 border-2 border-black rounded-lg" min="1" max="30" />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="font-bold">Max Groups</label>
                        <input type="number" value={settings.maxGroups} onChange={(e) => setSettings(s => ({ ...s, maxGroups: parseInt(e.target.value, 10) || 1 }))} className="mt-1 w-full p-2 border-2 border-black rounded-lg" min="1" max="15" />
                    </div>
                    <div className="self-end">
                        <NeoButton variant="accent" onClick={handleApplySettings} className="py-2.5">Apply</NeoButton>
                    </div>
                </div>
            </Card>
        </div>
        <NonogramGrid grid={grid} clues={clues} onCellClick={() => {}} onClueChange={handleClueChange} />
      </div>
    </main>
  );
};
export default SolverPage;