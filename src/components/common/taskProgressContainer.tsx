import React, { useState } from "react";
import './taskProgressContainer.css'
import MenuDropdown from "./menuDropdown";
import ProgressUpdater from "../internal/progressUpdater";

export interface ProgressContainerProps {
  task_ref_id: string;
  task_progress_id: string;
  label: string;
  pillar: string;
  type: string;
  link: string;
  description: string;
  start_date: string;
  end_date: string | null;
  targetList?: number[];
  progress: number;
  target: number;
  date: string;
}

const TaskProgressContainer: React.FC<ProgressContainerProps> = ({
  task_ref_id,
  task_progress_id,
  label,
  pillar,
  type,
  link,
  description,
  start_date,
  end_date,
  targetList,
  progress,
  target,
  date
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isUpdaterOpen, setIsUpdaterOpen] = useState(false); // ✅ State for opening ProgressUpdater

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const openUpdater = () => setIsUpdaterOpen(true);
  const closeUpdater = () => setIsUpdaterOpen(false);

  const options = [
    { label: "Update", action: () => openUpdater() }, // ✅ Open progress updater on update
    { label: "Delete", action: () => alert(`Delete ${label}`) },
  ];

  const completed = progress >= target;

  const DEFAULT_CLASS_NAME = `task-progress-container-${pillar}`;

  return (
    <>
      <div className={DEFAULT_CLASS_NAME}>
        <div className="col-1">
          {completed && (
            <img src="/svg-icons/task-completed.svg" alt="completed" />
          )}
        </div>
        <div className="col-7">{label}</div>
        <div className="col-2" onClick={openUpdater} style={{ cursor: "pointer" }}> {/* ✅ Click to open updater */}
          {progress}
        </div>
        <div className="col-1">{target}</div>
        <div className="col-1 menu-container"  onClick={toggleMenu}>
          <div className="menu-dropdown-button">⋮</div>
          <MenuDropdown isOpen={menuOpen} onClose={closeMenu} options={options} />
        </div>
      </div>

      {/* ✅ Progress Updater Modal */}
      <ProgressUpdater
        isOpen={isUpdaterOpen}
        onClose={closeUpdater}
        pillar={pillar}
        task_progress_id={task_progress_id}
        name={label}
        daily_progress={progress}
        type={type}
      />
    </>
  );
};

export default TaskProgressContainer;