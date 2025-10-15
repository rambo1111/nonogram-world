import { Sparkles, RefreshCw } from "lucide-react";
import NeoButton from "../../shared/NeoButton";
import Card from "../../shared/Card";

interface ControlPanelProps {
  onSolve: () => void;
  onReset: () => void;
}

function ControlPanel({ onSolve, onReset }: ControlPanelProps) {
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <NeoButton onClick={onSolve}>
          <Sparkles size={20} />
          Solve
        </NeoButton>
        <NeoButton variant="secondary" onClick={onReset}>
          <RefreshCw size={20} />
          Reset
        </NeoButton>
      </div>
    </Card>
  );
}

export default ControlPanel;