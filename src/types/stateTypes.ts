import { User } from "firebase/auth";
import { DailyTask, DailyTaskTracker } from "./models/dailyTask";


export interface TaskState {
  data: DailyTask[];
  loading: boolean;
  errors: any;
  message: string | null
}

export interface DailyTaskState {
  shloka: TaskState;
  namasmaran: TaskState;
}

export interface DateState{
  selectedDate: string;
  currentDate: string;
  weekStart: string;
  weekEnd: string;
  monthStart: string;
  monthEnd: string;
}

export interface AuthState {
  user: User | null;
}

export interface DailyTaskTrackerState{
  data: DailyTaskTracker;
  loading: boolean;
  errors: any;
  message: string | null
}

export interface DailyTasksTrackerState {
  shloka: DailyTaskTrackerState;
  namasmaran: DailyTaskTrackerState
}

export interface AppState{
  dailyTask: DailyTaskState;
  date: DateState;
  auth: AuthState;
  dailyTasksTracker: DailyTasksTrackerState
}
