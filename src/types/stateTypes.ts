import { User } from "firebase/auth";
import { DailyTask } from "./models/dailyTask";


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
}

export interface AuthState {
  user: User | null;
}

export interface AppState{
  dailyTask: DailyTaskState;
  date: DateState;
  auth: AuthState;
}