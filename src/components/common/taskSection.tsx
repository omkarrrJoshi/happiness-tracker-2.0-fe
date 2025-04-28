import React from "react";
import CollapsibleComponent from "./collapsibleComponent";
import DailyTasksProgressContainer from "../internal/dailyTasksProgressContainer";
import Loader from "./loader";
import { DailyTask } from "../../types/models/dailyTask";

interface TaskSectionProps {
  label: string;
  isLoading: boolean;
  tasks: DailyTask[];
  pillar: string;
  type: string;
  FormComponent: React.FC<{ isOpen: boolean; onClose: () => void; pillar: string; type: string }>; // Pass any form component
}

const TaskSection: React.FC<TaskSectionProps> = ({ label, isLoading, tasks, pillar, type, FormComponent  }) => {
  return (
    <CollapsibleComponent label={label} FormComponent={FormComponent} pillar={pillar} type={type}> 
      {isLoading && (
        <Loader /> // ✅ Show loading state
      ) }
      {tasks?.length > 0 ? (
        <DailyTasksProgressContainer pillar={pillar} type={type} tasks={tasks} />
      ) : (
        <p>No {label.toLowerCase()} available</p>
      )}
    </CollapsibleComponent>
  );
};

export default TaskSection;
