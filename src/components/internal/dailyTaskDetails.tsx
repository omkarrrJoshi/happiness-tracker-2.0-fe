import React, { useRef, useState } from "react";
import './dailyTaskDetails.css';
import ImageLoader from "../common/ImageLoader";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_DAILY_TASK_PROGREASS_REQUEST } from "../../redux/actions/action_keys";
import { UpdateDailyTaskProgressPayload, UpdateDailyTaskProgressRequest } from "../../types/models/dailyTask";
import { getUserId } from "../../redux/selectors/userSelector";

interface DailyTaskDetailsProps {
  task_ref_id: string;
  task_progress_id: string;
  image_url?: string;
  name: string;
  description: string;
  daily_progress: number;
  daily_target: number;
  link: string;
  start_date: string;
  end_date: string | null;
  target: number[];
  pillar: string;
  type: string;
  is_namsmaran?: boolean;
}

const DailyTaskDetails: React.FC<DailyTaskDetailsProps> = ({
  task_ref_id,
  task_progress_id,
  image_url,
  name,
  description,
  daily_progress,
  daily_target,
  link,
  start_date,
  end_date,
  target,
  pillar,
  type,
  is_namsmaran = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true); // ✅ Track image loading
  const [floatingAnimations, setFloatingAnimations] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const currentTaskProgress = useRef(daily_progress)

  const dispatch = useDispatch();
  const userId: string = useSelector(getUserId) as string;

  const DEFAULT_CLASS_NAME = "daily-task-details";

  const incrementDailyProgress = () => {
    currentTaskProgress.current +=  1
    const updatePayload: UpdateDailyTaskProgressPayload = {
      daily_progress: currentTaskProgress.current
    };
    const updatedBody: UpdateDailyTaskProgressRequest = {
      user_id: userId,
      id: task_progress_id,
      type: type,
      body: updatePayload,
    };
    dispatch({
      type: UPDATE_DAILY_TASK_PROGREASS_REQUEST,
      payload: updatedBody,
    });
  }

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is_namsmaran) return;

    // Get click position relative to the container
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create new animation
    const animationId = Date.now();
    setFloatingAnimations((prev) => [...prev, { id: animationId, x, y }]);

    // Remove animation after it completes
    setTimeout(() => {
      setFloatingAnimations((prev) => prev.filter((anim) => anim.id !== animationId));
    }, 1500); // Match animation duration

    incrementDailyProgress();
  };

  return (
    <div 
      className={`${DEFAULT_CLASS_NAME} ${pillar}-theme`}
      onClick={handleContainerClick}
      style={{ position: 'relative' }}
    >
      {/* Floating name animations */}
      {floatingAnimations.map((anim) => (
        <div
          key={anim.id}
          className={`${DEFAULT_CLASS_NAME}__floating-name`}
          style={{
            left: `${anim.x}px`,
            top: `${anim.y}px`,
          }}
        >
          {name}
        </div>
      ))}

      <h3 className={`${DEFAULT_CLASS_NAME}__title`}>{name}</h3>

      {/* ✅ Show Loader Until Image Loads */}
      {image_url && (
        <div className={`${DEFAULT_CLASS_NAME}__image-container`}>
          {isImageLoading && <ImageLoader />} {/* Show loader while loading */}
          <img
            src={image_url}
            alt={name}
            className={`${DEFAULT_CLASS_NAME}__image`}
            onLoad={() => setIsImageLoading(false)} // Hide loader when loaded
            onError={() => setIsImageLoading(false)} // Hide loader if failed
            style={{ display: isImageLoading ? "none" : "block" }} // Hide image until loaded
          />
        </div>
      )}

      <div className={`${DEFAULT_CLASS_NAME}__progress-container`}>
        <div className={`${DEFAULT_CLASS_NAME}__progress-header`}>
          <span className={`${DEFAULT_CLASS_NAME}__progress-label`}>Today's Progress</span>
          <span className={`${DEFAULT_CLASS_NAME}__progress-percentage`}>
            {daily_target > 0 ? Math.round((currentTaskProgress.current / daily_target) * 100) : 0}%
          </span>
        </div>
        <div className={`${DEFAULT_CLASS_NAME}__progress-numbers`}>
          <span className={`${DEFAULT_CLASS_NAME}__progress-current`}>{currentTaskProgress.current}</span>
          <span className={`${DEFAULT_CLASS_NAME}__progress-separator`}>/</span>
          <span className={`${DEFAULT_CLASS_NAME}__progress-target`}>{daily_target}</span>
        </div>
        <div className={`${DEFAULT_CLASS_NAME}__progress-bar-container`}>
          <div 
            className={`${DEFAULT_CLASS_NAME}__progress-bar-fill`}
            style={{ 
              width: `${daily_target > 0 ? Math.min((currentTaskProgress.current / daily_target) * 100, 100) : 0}%` 
            }}
          ></div>
        </div>
      </div>

      <div
        className={`${DEFAULT_CLASS_NAME}__description ${isExpanded ? `${DEFAULT_CLASS_NAME}__description--expanded` : `${DEFAULT_CLASS_NAME}__description--collapsed`}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {description}
      </div>
    </div>
  );
};

export default DailyTaskDetails;
