  import React, { useState } from "react";
  import './taskProgressContainer.css'
  import MenuDropdown from "./menuDropdown";
  import { useDispatch } from "react-redux";
  import { UpdateDailyTaskProgressRequest } from "../../types/models/dailyTask";
  import { getUserId } from "../../redux/selectors/userSelector";
  import { useSelector } from "react-redux";
  import { UPDATE_DAILY_TASK_PROGREASS_REQUEST } from "../../redux/actions/action_keys";
  import CounterBox from "./counterBox";

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
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    const options = [
      { label: "Update", action: () => alert(`Update ${label}`) }, // ✅ Open progress updater on update
      { label: "Delete", action: () => alert(`Delete ${label}`) },
    ];

    const user_id = useSelector(getUserId)

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
          <div className="col-6">{label}</div>
          <div className="col-3"> {/* ✅ Click to open updater */}
          <CounterBox
              progress={progress} 
              updateProgress={updateProgress} 
              enable={true} 
              label={label}
              pillar={pillar}
            />
          </div>
          <div className="col-1">{target}</div>
          <div className="col-1 menu-container"  onClick={toggleMenu}>
            <div className="menu-dropdown-button">⋮</div>
            <MenuDropdown isOpen={menuOpen} onClose={closeMenu} options={options} />
          </div>
        </div>
      </>
    );
  };

  export default TaskProgressContainer;