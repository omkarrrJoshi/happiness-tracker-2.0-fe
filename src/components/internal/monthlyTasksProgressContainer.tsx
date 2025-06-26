import { MonthlyTaskProgress } from "../../types/models/monthlyTask";
import { ProgressContainerProps } from "../common/taskProgressContainer";
import TaskProgrerssContainerHolder from "../common/taskProgressContainerHolder";

import './monthlyTasksProgressContainer.css'

export interface MonthlyTasksProgressContainerProps {
  tasks: MonthlyTaskProgress[],
  pillar: string,
  type: string
}

const MonthlyTasksProgressContainer: React.FC<MonthlyTasksProgressContainerProps> = ({
  tasks,
  pillar,
  type
}) => {
  const DEFAULT_CLASS_NAME = `monthly-tasks-progress-container`
  const convertToTask = (tasks: MonthlyTaskProgress[]): ProgressContainerProps[] => {
    const incompleteTasks = tasks.filter(task => task.target !== 0 && task.progress < task.target);
    const completedTasks = tasks.filter(task => task.target !== 0 && task.progress >= task.target);
    const deletedTasks = tasks.filter(task => task.target === 0)
  
    return [
      ...incompleteTasks.map(task => ({
        task_ref_id: task.ref_id,
        task_progress_id: task.progress_id,
        label: task.name,
        pillar: task.pillar,
        type: task.type,
        link: "", // Monthly tasks don't have link in progress data
        description: "", // Monthly tasks don't have description in progress data
        start_date: task.start_date,
        end_date: task.end_date || null, // Handle undefined case
        targetList: [task.target], // Convert single target to array for compatibility
        progress: task.progress,
        target: task.target,
        date: task.date,
      })),
      ...completedTasks.map(task => ({
        task_ref_id: task.ref_id,
        task_progress_id: task.progress_id,
        label: task.name,
        pillar: task.pillar,
        type: task.type,
        link: "", // Monthly tasks don't have link in progress data
        description: "", // Monthly tasks don't have description in progress data
        start_date: task.start_date,
        end_date: task.end_date || null, // Handle undefined case
        targetList: [task.target],
        progress: task.progress,
        target: task.target,
        date: task.date,
      })),
      ...deletedTasks.map(task => ({
        task_ref_id: task.ref_id,
        task_progress_id: task.progress_id,
        label: task.name,
        pillar: task.pillar,
        type: task.type,
        link: "", // Monthly tasks don't have link in progress data
        description: "", // Monthly tasks don't have description in progress data
        start_date: task.start_date,
        end_date: task.end_date || null, // Handle undefined case
        targetList: [task.target],
        progress: task.progress,
        target: task.target,
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

export default MonthlyTasksProgressContainer; 