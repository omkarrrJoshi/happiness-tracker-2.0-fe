// Monthly Task Reference (for creating tasks)
export interface MonthlyTaskRef {
  id: string;
  user_id: string;
  name: string;
  pillar: string;
  type: string;
  target: number;
  link?: string;
  description?: string;
  image_url?: string | null;
  start_date: string;
  end_date?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Monthly Task Progress (for fetching tasks)
export interface MonthlyTaskProgress {
  ref_id: string;
  progress_id: string;
  name: string;
  pillar: string;
  start_date: string;
  end_date?: string | null;
  progress: number;
  target: number;
  date: string;
  type: string;
}

// Create Monthly Task Request
export interface CreateMonthlyTaskPayload {
  user_id: string;
  type: string;
  pillar: string;
  target: number;
  name: string;
  link?: string;
  description?: string;
  start_month: number;
  start_year: number;
  end_month?: number;
  end_year?: number;
}

// Fetch Monthly Tasks Query Parameters
export interface FetchMonthlyTasksQueryArgs {
  month: number;
  year: number;
  type: string;
  pillar: string;
} 