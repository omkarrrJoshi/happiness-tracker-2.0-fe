import React from "react";
import ExpandableComponent from "./collapsibleComponent";
import DailyTasksProgressContainer from "../internal/dailyTasksProgressContainer";

interface TaskSectionProps {
  label: string;
  isLoading: boolean;
  tasks: any[];
  pillar: string;
  type: string;
  FormComponent: React.FC<{ isOpen: boolean; onClose: () => void; type: string }>; // Pass any form component
}

const TaskSection: React.FC<TaskSectionProps> = ({ label, isLoading, tasks, pillar, type, FormComponent  }) => {
  return (
    <ExpandableComponent label={label} FormComponent={FormComponent} type={type}> 
      {isLoading ? (
        <p>Loading {label.toLowerCase()}...</p> // ✅ Show loading state
      ) : tasks?.length > 0 ? (
        <DailyTasksProgressContainer pillar={pillar} type={type} tasks={tasks} />
      ) : (
        <p>No {label.toLowerCase()} available</p>
      )}
    </ExpandableComponent>
  );
};

export default TaskSection;
