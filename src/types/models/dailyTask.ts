export interface DailyTask {
  daily_task_ref_id: string;
  daily_task_progress_id: string;
  name: string;
  pillar: string;
  type: string;
  link: string;
  description: string;
  start_date: string;
  end_date: string | null;
  target: number[];
  daily_progress: number;
  daily_target: number;
  date: string;
}


export interface CreateDailyTaskPayload {
  user_id: string,
  type: string,
  pillar: string,
  target: number[],
  name: string,
  link?: string,
  description?: string,
  date: string,
  start_date: string,
  end_date?: string
}

export interface UpdateDailyTaskProgressPayload {
  daily_target?: number,
  daily_progress?: number
}

export interface UpdateDailyTaskProgressRequest {
  user_id: string,
  id: string,
  type: string,
  body: UpdateDailyTaskProgressPayload
}

export interface FetchDailyTasTrackerRequest {
  user_id: string, 
  type: string,
  start_date: string,
  end_date: string
}

export interface DailyTaskTracker {
  total_progress: number,
  total_target: number
}