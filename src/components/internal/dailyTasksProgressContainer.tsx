import { DailyTask } from "../../types/models/dailyTask";
import { ProgressContainerProps } from "../common/taskProgressContainer";
import TaskProgrerssContainerHolder from "../common/taskProgressContainerHolder";

import './dailyTasksProgressContainer.css'

export interface DailyTasksProgressContainerProps {
  tasks: DailyTask[],
  pillar: string,
  type: string
}

const DailyTasksProgressContainer: React.FC<DailyTasksProgressContainerProps> = ({
  tasks,
  pillar,
  type
}) => {
  const DEFAULT_CLASS_NAME = `daily-tasks-progress-container-${pillar}-${type}`

  const convertToTask = (tasks: DailyTask[]): ProgressContainerProps[] => {
    const incompleteTasks = tasks.filter(task => task.daily_target !== 0 && task.daily_progress < task.daily_target);
    const completedTasks = tasks.filter(task => task.daily_target !== 0 && task.daily_progress >= task.daily_target);
    const deletedTasks = tasks.filter(task => task.daily_target === 0)
  
    return [
      ...incompleteTasks.map(task => ({
        task_ref_id: task.daily_task_ref_id,
        task_progress_id: task.daily_task_progress_id,
        label: task.name, // Mapping `name` to `label`
        pillar: task.pillar,
        type: task.type,
        link: task.link,
        description: task.description,
        start_date: task.start_date,
        end_date: task.end_date,
        targetList: task.target, // Renaming `target` to `targetList`
        progress: task.daily_progress, // Mapping `daily_progress` to `progress`
        target: task.daily_target, // Mapping `daily_target` to `target`
        date: task.date,
      })),
      ...completedTasks.map(task => ({
        task_ref_id: task.daily_task_ref_id,
        task_progress_id: task.daily_task_progress_id,
        label: task.name,
        pillar: task.pillar,
        type: task.type,
        link: task.link,
        description: task.description,
        start_date: task.start_date,
        end_date: task.end_date,
        targetList: task.target,
        progress: task.daily_progress,
        target: task.daily_target,
        date: task.date,
      })),
      ...deletedTasks.map(task => ({
        task_ref_id: task.daily_task_ref_id,
        task_progress_id: task.daily_task_progress_id,
        label: task.name,
        pillar: task.pillar,
        type: task.type,
        link: task.link,
        description: task.description,
        start_date: task.start_date,
        end_date: task.end_date,
        targetList: task.target,
        progress: task.daily_progress,
        target: task.daily_target,
        date: task.date,
      })),
    ];
  };
  
  return (
    <div className={DEFAULT_CLASS_NAME}>
      <TaskProgrerssContainerHolder 
        pillar={pillar}
        tasks={convertToTask(tasks)}
      />
    </div>
  )
}

export default DailyTasksProgressContainer;