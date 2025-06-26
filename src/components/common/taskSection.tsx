import React from "react";
import CollapsibleComponent from "./collapsibleComponent";
import DailyTasksProgressContainer from "../internal/dailyTasksProgressContainer";
import MonthlyTasksProgressContainer from "../internal/monthlyTasksProgressContainer";
import Loader from "./loader";
import { DailyTask } from "../../types/models/dailyTask";
import { MonthlyTaskProgress } from "../../types/models/monthlyTask";

interface TaskSectionProps {
  label: string;
  isLoading: boolean;
  tasks: DailyTask[] | MonthlyTaskProgress[];
  pillar: string;
  type: string;
  FormComponent: React.FC<{ isOpen: boolean; onClose: () => void; pillar: string; type: string; taskType: string }>;
  taskType: string;
}

const TaskSection: React.FC<TaskSectionProps> = ({ label, isLoading, tasks, pillar, type, FormComponent, taskType }) => {
  return (
    <CollapsibleComponent label={label} FormComponent={FormComponent} pillar={pillar} type={type} taskType={taskType}> 
      {isLoading && (
        <Loader /> // ✅ Show loading state
      ) }
      {tasks?.length > 0 ? (
        taskType === "daily" ? (
          <DailyTasksProgressContainer pillar={pillar} type={type} tasks={tasks as DailyTask[]} />
        ) : (
          <MonthlyTasksProgressContainer pillar={pillar} type={type} tasks={tasks as MonthlyTaskProgress[]} />
        )
      ) : (
        <p>No {label.toLowerCase()} available</p>
      )}
    </CollapsibleComponent>
  );
};

export default TaskSection;
