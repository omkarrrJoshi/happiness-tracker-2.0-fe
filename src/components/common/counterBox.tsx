import { useState } from "react";
import ProgressOrTargetUpdater from "../internal/progressOrTargetUpdater";
import './counterBox.css'

interface CounterBoxProps {
  progress: number;
  updateProgress: (update: Partial<{ daily_progress: number; daily_target: number }>) => void
  enable: boolean;
  label: string;
  pillar: string;
}

const CounterBox: React.FC<CounterBoxProps> = ({ progress, updateProgress, enable, label, pillar }) => {
  const [isUpdaterOpen, setIsUpdaterOpen] = useState(false); // ✅ State for opening ProgressUpdater

  const openUpdater = () => setIsUpdaterOpen(true);
  const closeUpdater = () => setIsUpdaterOpen(false);

  const DEFAULT_CLASS_NAME = "counter-box";

  const increment = () => {
    if (enable) updateProgress({ daily_progress:progress + 1});
  };

  const decrement = () => {
    if (enable && progress > 0) updateProgress({ daily_progress: progress - 1});
  };

  return (
    <div>
      {/* Counter Box */}
      <div className={DEFAULT_CLASS_NAME}>
        <button className="counter-btn counter-btn-negative" onClick={decrement} disabled={!enable}>
          -
        </button>
        <div
          className={`${DEFAULT_CLASS_NAME}-small-box ${enable ? "active" : "disabled"}`}
          onClick={openUpdater}
        >
          {progress}
        </div>
        <button className="counter-btn counter-btn-positive" onClick={increment} disabled={!enable}>
          +
        </button>
      </div>

      {/* ✅ Progress Updater Modal */}
      <ProgressOrTargetUpdater
        toUpdate="progress"
        isOpen={isUpdaterOpen}
        onClose={closeUpdater}
        pillar={pillar}
        name={label}
        current_value={progress}
        updateFunc={updateProgress}
      />
    </div>
  );
};

export default CounterBox;
