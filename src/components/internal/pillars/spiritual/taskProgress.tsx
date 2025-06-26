import TaskSection from "../../../common/taskSection";
import { DailyTask } from "../../../../types/models/dailyTask";
import { MonthlyTaskProgress } from "../../../../types/models/monthlyTask";

interface TaskProgressProp {
  label: string;
  isLoading: boolean;
  tasks: DailyTask[] | MonthlyTaskProgress[];
  pillar: string;
  type: string;
  FormComponent: React.FC<{ isOpen: boolean; onClose: () => void; pillar: string; type: string; taskType: string }>;
  taskType: string;
}

interface TaskProgressProps {
  sections: TaskProgressProp[];
}

const TaskProgress: React.FC<TaskProgressProps> = ({ sections }) => {
  return (
    <div>
      {sections.map((section, index) => (
        <TaskSection
          key={index}
          label={section.label}
          isLoading={section.isLoading}
          tasks={section.tasks}
          pillar={section.pillar}
          type={section.type}
          FormComponent={section.FormComponent}
          taskType={section.taskType}
        />
      ))}
    </div>
  );
};

export default TaskProgress;
