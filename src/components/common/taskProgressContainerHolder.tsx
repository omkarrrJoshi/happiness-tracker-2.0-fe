import TaskProgressContainer, { ProgressContainerProps } from "./taskProgressContainer";

export interface TaskProgrerssContainerHolderProps{
  pillar: string,
  tasks: ProgressContainerProps[]
}

const TaskProgrerssContainerHolder: React.FC<TaskProgrerssContainerHolderProps> = ({
  pillar,
  tasks
}) => {
  const DEFAULT_CLASS_NAME = `task-progress-container-holder`
  return (
    <div className={DEFAULT_CLASS_NAME}>
      {
        tasks.map((task) => (
          <TaskProgressContainer key={task.task_progress_id} {...task} />
        ))
      }
    </div>
  );
}

export default TaskProgrerssContainerHolder;