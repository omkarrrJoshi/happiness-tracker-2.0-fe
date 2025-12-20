import React, { useState } from "react";
import { useParams } from "react-router-dom";
import WebHeader from "../components/common/webHeader"
import DailyTaskDetails from "../components/internal/dailyTaskDetails"
import ShlokaForm from "../components/internal/shloka/shlokaForm";
import { useSelector } from "react-redux";
import { AppState } from "../types/stateTypes";
import { getDailyTaskByRefId } from "../redux/selectors/dailyTaskSelector";
import { formatDateForDatePicker } from "../utils/utils";
import "../components/internal/dailyTaskDetails.css";
import "./dailyTaskDetailsHolder.css";

const DailyTaskDetailsHolder: React.FC = () => {
  const { type, task_ref_id } = useParams();
  const dailyTask = useSelector((state: AppState) => getDailyTaskByRefId(state, task_ref_id, type));
  const [isEditOpen, setIsEditOpen] = useState(false);

  const DEFAULT_CLASS_NAME = "daily-task-details";

  if (!dailyTask) {
    return <div>Task not found, go back and come again</div>;
  }

  return (
    <div className="daily-task-details-holder">
      <WebHeader title="Happiness Tracker" />
      <div className="daily-task-details-holder__content-wrapper">
        <DailyTaskDetails 
          task_ref_id={dailyTask.daily_task_ref_id}
          task_progress_id={dailyTask.daily_task_progress_id}
          image_url={dailyTask.image_url}
          name={dailyTask.name}
          description={dailyTask.description}
          daily_target={dailyTask.daily_target}
          daily_progress={dailyTask.daily_progress}
          link={dailyTask.link}
          start_date={formatDateForDatePicker(dailyTask.start_date)}
          end_date={formatDateForDatePicker(dailyTask.end_date)}
          target={dailyTask.target}
          pillar={dailyTask.pillar}
          type={dailyTask.type}
          is_namsmaran={dailyTask.type === "namasmaran"}
        />
      </div>
      <div className={`${DEFAULT_CLASS_NAME}__actions`}>
        <button 
          className={`${DEFAULT_CLASS_NAME}__edit-btn`} 
          onClick={() => setIsEditOpen(true)}
        >
          Edit
        </button>
        <button 
          className={`${DEFAULT_CLASS_NAME}__delete-btn`}
          onClick={() => {
            // Delete functionality can be added here
          }}
        >
          Delete
        </button>
      </div>

      {isEditOpen && (
        <ShlokaForm
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          pillar={dailyTask.pillar}
          type={dailyTask.type}
          taskType="daily"
          initialData={{
            id: dailyTask.daily_task_ref_id,
            name: dailyTask.name,
            description: dailyTask.description,
            daily_progress: dailyTask.daily_progress,
            daily_target: dailyTask.daily_target,
            link: dailyTask.link,
            start_date: formatDateForDatePicker(dailyTask.start_date),
            end_date: formatDateForDatePicker(dailyTask.end_date),
            target: dailyTask.target,
            image_url: dailyTask.image_url
          }}
        />
      )}
    </div>
  )
}

export default DailyTaskDetailsHolder;