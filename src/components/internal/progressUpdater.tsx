import React, { useState } from "react";

import './progressUpdater.css'
interface ProgressUpdaterProps {
  isOpen: boolean;
  onClose: () => void;
  pillar: string;
  name: string;
  daily_progress: number;
  updateProgress: (newProgress: number) => void;
}

const ProgressUpdater: React.FC<ProgressUpdaterProps> = (
  { isOpen, 
    onClose, 
    pillar, 
    name, 
    daily_progress, 
    updateProgress 
  }) => {
  const [progress, setProgress] = useState<string>("");
  if (!isOpen) return null;

  const DEFAULT_CLASS_NAME = `progress-updater-${pillar}`;

  return (
    <div className="modal-overlay">
      <div className={DEFAULT_CLASS_NAME}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h3 className="required">Update daily progress of {name}</h3>

        <div className={`${DEFAULT_CLASS_NAME}-input-container`}>
          <input
            type="number"
            className={`${DEFAULT_CLASS_NAME}-input`}
            placeholder="Enter daily progress"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
          />
        </div>

        <div className={`${DEFAULT_CLASS_NAME}-button-group`}>
          <button type="button" className="btn" onClick={() => updateProgress(Number(progress))}>
            Overwrite
          </button>
          <button type="button" className="btn" onClick={() => updateProgress(daily_progress + Number(progress))}>
            Append
          </button>
        </div>

        <div className={`${DEFAULT_CLASS_NAME}-note`}>
          <p><strong>Note:</strong></p>
          <p><strong>Overwrite:</strong> Replaces the current progress with the new value.</p>
          <p><strong>Append:</strong> Adds the new value to the existing progress.</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressUpdater;
