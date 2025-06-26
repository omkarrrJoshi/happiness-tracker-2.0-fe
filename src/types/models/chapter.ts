// Chapter Reference (for creating chapters)
export interface ChapterRef {
  id: string;
  task_ref_id: string;
  name: string;
  target: string;
  link?: string;
  description?: string;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Chapter Progress (for fetching chapters)
export interface ChapterProgress {
  id: string;
  task_chapter_ref_id: string;
  status: boolean;
  name: string;
  iteration: number;
  link?: string;
  description?: string;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  chapter_created_at: string;
}

// Chapter Progress Group (grouped by iteration)
export interface ChapterProgressGroup {
  status: boolean;
  data: ChapterProgress[];
}

// Chapters Response (grouped by iteration)
export interface ChaptersResponse {
  [iteration: string]: ChapterProgressGroup;
}

// Create Chapter Request
export interface CreateChapterPayload {
  name: string;
  link?: string;
  description?: string;
}

// Update Chapter Progress Request
export interface UpdateChapterProgressPayload {
  status: boolean;
  task_progress_id: string;
}

// Update Chapter Progress Response
export interface UpdateChapterProgressResponse {
  task_chapter_progress_id: string;
  status: boolean;
}

// Fetch Chapters Query Parameters
export interface FetchChaptersQueryArgs {
  task_ref_id: string;
  task_progress_id?: string;
} 