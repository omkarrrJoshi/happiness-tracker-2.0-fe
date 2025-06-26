import React, { useState } from "react";

import './progressOrTargetUpdater.css'
import { showNotification } from "../../utils/notification";
interface ProgressUpdaterProps {
  toUpdate: "progress" | "target";
  isOpen: boolean;
  onClose: () => void;
  pillar: string;
  name: string;
  current_value: number;
  updateFunc: (update: Partial<{ daily_progress: number; daily_target: number }>) => void
  enable: boolean;
}

const ProgressOrTargetUpdater: React.FC<ProgressUpdaterProps> = (
  { 
    toUpdate,
    isOpen, 
    onClose, 
    pillar, 
    name, 
    current_value, 
    updateFunc,
    enable
  }) => {
  const [updated_value, setProgress] = useState<string>("");
  if (!isOpen) return null;

  const DEFAULT_CLASS_NAME = `progress-or-target-updater-${pillar}`;

  if(!enable){
    showNotification("This task is not updatable, either it is a Monthly task or it's target is 0", "error");
    onClose();
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className={DEFAULT_CLASS_NAME}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h3 className="required">Update daily {toUpdate} of {name}</h3>

        <div className={`${DEFAULT_CLASS_NAME}-input-container`}>
          <input
            type="number"
            className={`${DEFAULT_CLASS_NAME}-input`}
            placeholder={`Enter daily ${toUpdate}`}
            value={updated_value}
            onChange={(e) => setProgress(e.target.value)}
          />
        </div>

        <div className={`${DEFAULT_CLASS_NAME}-button-group`}>
          <button type="button" className="btn" onClick={() => {
            if(toUpdate === "progress"){
              return updateFunc({daily_progress: Number(updated_value)})
            }
            else{
              return updateFunc({daily_target: Number(updated_value)})
            }
          }}>
            Overwrite
          </button>
          <button type="button" className="btn" onClick={() => {
            if(toUpdate === "progress"){
              return updateFunc({daily_progress: current_value + Number(updated_value)})
            }
            else{
              return updateFunc({daily_target: current_value + Number(updated_value)})
            }
          }}>
            Append
          </button>
        </div>

        <div className={`${DEFAULT_CLASS_NAME}-note`}>
          <p><strong>Note:</strong></p>
          <p><strong>Overwrite:</strong> Replaces the current {toUpdate} with the new value.</p>
          <p><strong>Append:</strong> Adds the new value to the existing {toUpdate}.</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressOrTargetUpdater;
