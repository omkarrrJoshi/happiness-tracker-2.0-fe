  import React, { useState } from "react";
  import './taskProgressContainer.css'
  import MenuDropdown from "./menuDropdown";
  import { useDispatch } from "react-redux";
  import { UpdateDailyTaskProgressRequest } from "../../types/models/dailyTask";
  import { getUserId } from "../../redux/selectors/userSelector";
  import { useSelector } from "react-redux";
  import { UPDATE_DAILY_TASK_PROGREASS_REQUEST } from "../../redux/actions/action_keys";
  import CounterBox from "./counterBox";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../utils/notification";
import ProgressOrTargetUpdater from "../internal/progressOrTargetUpdater";

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isUpdaterOpen, setIsUpdaterOpen] = useState(false); // ✅ State for opening ProgressUpdater

    const openUpdater = () => {
      const confirmUpdate = window.confirm(
        `This will update the daily target for "${label}" for today only.\n\n` +
        `If you want to update the target for other dates, please click on the "${label}" from table and choose "Edit".\n\n` +
        `Do you want to continue for updating only todays daily target?`
      );;
      if (confirmUpdate) {
        setIsUpdaterOpen(true);
      }
    };
    const closeUpdater = () => setIsUpdaterOpen(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    const user_id = useSelector(getUserId)

    const updateTaskValue = (update: Partial<{ daily_progress: number; daily_target: number }>): void => {
      const updatedBody: UpdateDailyTaskProgressRequest = {
        user_id: user_id,
        id: task_progress_id,
        type: type,
        body: update,
      };
    
      dispatch({
        type: UPDATE_DAILY_TASK_PROGREASS_REQUEST,
        payload: updatedBody,
      });
    };

    const handleDeleteAction = () => {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete today's target for "${label}"?\n\n` +
        `This will set the daily target to 0 for today only. Your progress will also set to 0.\n\n` +
        `Rest assure: you can update daily target after deletion as well.\n\n` +
        `Do you want to continue?`
      );
      if (confirmDelete) {
        updateTaskValue({ daily_target: 0, daily_progress: 0 });
      }
    };

    const handleLinkAction = () => {
      if (link) {
        window.open(link, "_blank"); // ✅ opens in new tab
      } else {
        showNotification(`No resource link found for this ${type}.`);
      }
    };

    
    const options = [
      { label: "Update", action: () => openUpdater() }, // ✅ Open progress updater on update
      { label: "Delete", action: () => handleDeleteAction() },
      { label: "Resource Url", action: () => handleLinkAction() }
    ];

    const completed = target !== 0 && progress >= target;

    const DEFAULT_CLASS_NAME = target === 0 ? `deleted-task-progress-container` : `task-progress-container`;

    return (
      <>
        <div className={`${DEFAULT_CLASS_NAME} ${pillar}-theme`}>
          <div className="col-1">
            {completed ? (
              <img src="/svg-icons/task-completed.svg" alt="completed" />
            ):
            (
              <input type="checkbox" onChange={() =>updateTaskValue({daily_progress: target})}></input>
            )
            }
          </div>
          <div className="col-6" onClick={() => navigate(`/${pillar}/${type}/${task_ref_id}`)}>
              {label}
          </div>
          <div className="col-3"> {/* ✅ Click to open updater */}
          <CounterBox
              progress={progress} 
              updateProgress={updateTaskValue} 
              enable={target !== 0} 
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
        {/* ✅ Progress Updater Modal */}
        <ProgressOrTargetUpdater
          toUpdate="target"
          isOpen={isUpdaterOpen}
          onClose={closeUpdater}
          pillar={pillar}
          name={label}
          current_value={target}
          updateFunc={updateTaskValue}
        />
      </>
    );
  };

  export default TaskProgressContainer;