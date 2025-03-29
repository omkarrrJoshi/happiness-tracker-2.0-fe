import React, { useState } from "react";
import './dailyTaskDetails.css';
import ShlokaForm from "./shloka/shlokaForm";

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
  type: string; // ✅ Pass type to differentiate task types
}

const DailyTaskDetails: React.FC<DailyTaskDetailsProps> = ({
  task_ref_id,
  image_url,
  name,
  description,
  daily_progress,
  daily_target,
  start_date,
  end_date,
  target,
  type
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // ✅ Modal state for edit form

  const DEFAULT_CLASS_NAME = "daily-task-details"; // ✅ Default Class Prefix

  return (
    <div className={DEFAULT_CLASS_NAME}>
      <h3 className={`${DEFAULT_CLASS_NAME}__title`}>{name}</h3>
      
      {image_url && (
        <img src={image_url} alt={name} className={`${DEFAULT_CLASS_NAME}__image`} />
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

      {/* ✅ Edit Form Modal */}
      {isEditOpen && (
        <ShlokaForm
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          type={type}
          initialData={{
            id: task_ref_id,
            name,
            description,
            daily_progress,
            daily_target,
            start_date,
            end_date,
            target
          }} // ✅ Pass current data as initial values
        />
      )}
    </div>
  );
};

export default DailyTaskDetails;
