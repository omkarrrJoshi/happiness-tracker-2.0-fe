import React, { useState } from "react";
import { UpdateDailyTaskProgressRequest } from "../../types/models/dailyTask";
import { useDispatch } from "react-redux";
import { UPDATE_DAILY_TASK_PROGREASS_REQUEST } from "../../redux/actions/action_keys";

import './progressUpdater.css'
import { useSelector } from "react-redux";
import { getUserId } from "../../redux/selectors/userSelector";
interface ProgressUpdaterProps {
  isOpen: boolean;
  onClose: () => void;
  pillar: string;
  task_progress_id: string;
  name: string;
  daily_progress: number;
  type: string;
}

const ProgressUpdater: React.FC<ProgressUpdaterProps> = ({ isOpen, onClose, pillar, task_progress_id, name, daily_progress, type }) => {
  const [progress, setProgress] = useState<string>("");
  const user_id = useSelector(getUserId)

  const dispatch = useDispatch()
  if (!isOpen) return null;

  const updateProgress = (newProgress: number):void => {
    const updatedBody: UpdateDailyTaskProgressRequest = {
      user_id: user_id,
      id: task_progress_id,
      type: type,
      body: {
        daily_progress: newProgress
      }
    }
    dispatch({
      type: UPDATE_DAILY_TASK_PROGREASS_REQUEST,
      payload: updatedBody
    })
  }

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
