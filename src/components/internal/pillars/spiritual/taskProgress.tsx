import TaskSection from "../../../common/taskSection";
import { DailyTask } from "../../../../types/models/dailyTask";

interface TaskProgressProp {
  label: string;
  isLoading: boolean;
  tasks: DailyTask[];
  pillar: string;
  type: string;
  FormComponent: React.FC<{ isOpen: boolean; onClose: () => void; pillar: string; type: string }>;
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
        />
      ))}
    </div>
  );
};

export default TaskProgress;
