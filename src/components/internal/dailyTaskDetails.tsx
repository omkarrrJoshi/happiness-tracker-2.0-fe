import React, { useState } from "react";
import './dailyTaskDetails.css';
import ShlokaForm from "./shloka/shlokaForm";
import ImageLoader from "../common/ImageLoader";

interface DailyTaskDetailsProps {
  task_ref_id: string;
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
}

const DailyTaskDetails: React.FC<DailyTaskDetailsProps> = ({
  task_ref_id,
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
  type
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true); // ✅ Track image loading

  const DEFAULT_CLASS_NAME = "daily-task-details";

  return (
    <div className={`${DEFAULT_CLASS_NAME} ${pillar}-theme`}>
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

      <p className={`${DEFAULT_CLASS_NAME}__progress`}>
        Today's Progress: {daily_progress} / {daily_target}
      </p>

      <div
        className={`${DEFAULT_CLASS_NAME}__description ${isExpanded ? `${DEFAULT_CLASS_NAME}__description--expanded` : `${DEFAULT_CLASS_NAME}__description--collapsed`}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {description}
      </div>

      <div className={`${DEFAULT_CLASS_NAME}__actions`}>
        <button className={`${DEFAULT_CLASS_NAME}__edit-btn`} onClick={() => setIsEditOpen(true)}>Edit</button>
        <button className={`${DEFAULT_CLASS_NAME}__delete-btn`}>Delete</button>
      </div>

      {isEditOpen && (
        <ShlokaForm
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          pillar={pillar}
          type={type}
          taskType="daily"
          initialData={{
            id: task_ref_id,
            name,
            description,
            daily_progress,
            daily_target,
            link,
            start_date,
            end_date,
            target,
            image_url
          }}
        />
      )}
    </div>
  );
};

export default DailyTaskDetails;
