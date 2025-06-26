import { baseApiSlice } from './baseApiSlice';
import { GET, POST, PUT, FETCH_MONTHLY_TASKS, CREATE_MONTHLY_TASK, FETCH_CHAPTERS, CREATE_CHAPTER, UPDATE_CHAPTER_PROGRESS } from '../../constants/apis';
import { 
  CreateMonthlyTaskPayload, 
  FetchMonthlyTasksQueryArgs 
} from '../../types/models/monthlyTask';
import {
  CreateChapterPayload,
  FetchChaptersQueryArgs,
  UpdateChapterProgressPayload
} from '../../types/models/chapter';
import { showNotification } from '../../utils/notification';
import ApiResponse from '../../types/apiResponse';

// Extend the base API slice with monthly task endpoints
export const monthlyTaskApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query endpoint to fetch monthly tasks
    fetchMonthlyTasks: builder.query<ApiResponse, FetchMonthlyTasksQueryArgs>({
      query: (args) => {
        return {
          url: FETCH_MONTHLY_TASKS,
          method: GET,
          params: {
            month: args.month.toString(),
            year: args.year.toString(),
            type: args.type,
            pillar: args.pillar
          },
        };
      },
      providesTags: (result, error, args) => [
        // Tag based on query parameters
        { type: 'MonthlyTasks' as const, id: `LIST-${args.type}-${args.month}-${args.year}` },
        // Tag based on individual task ref_ids from response
        ...(result?.data?.map(({ ref_id }: { ref_id: string }) => ({ 
          type: 'MonthlyTasks' as const, 
          id: ref_id 
        })) || []),
        // General list tag
        { type: 'MonthlyTasks', id: 'LIST' },
      ],
    }),

    // Mutation endpoint to create monthly task
    createMonthlyTask: builder.mutation<ApiResponse, CreateMonthlyTaskPayload>({
      query: (body) => ({
        url: CREATE_MONTHLY_TASK,
        method: POST,
        body,
      }),
      invalidatesTags: (result, error, body) => [
        // Invalidate based on the task type from body
        { type: 'MonthlyTasks' as const, id: `LIST-${body.type}` },
        // Invalidate based on month/year from body (you might need to calculate this)
        { type: 'MonthlyTasks' as const, id: `LIST-${body.type}-${body.start_month}-${body.start_year}` },
        // Invalidate general list
        { type: 'MonthlyTasks', id: 'LIST' },
        // Invalidate all monthly tasks
        'MonthlyTasks',
      ],
      // You can integrate with your notification system here
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          showNotification(data.message, 'success');
        } catch (error: any) {
          const message = "Error creating monthly task";
          console.log("error message:", message);
        }
      },
    }),

    // Query endpoint to fetch chapters
    fetchChapters: builder.query<ApiResponse, FetchChaptersQueryArgs>({
      query: (args) => {
        let url = FETCH_CHAPTERS.replace(':task_ref_id', args.task_ref_id);
        let params: Record<string, string> = {};
        if (args.task_progress_id) {
          params.task_progress_id = args.task_progress_id;
        }
        return {
          url,
          method: GET,
          params,
        };
      },
      providesTags: (result, error, args) => [
        // Tag based on task_ref_id
        { type: 'Chapters' as const, id: args.task_ref_id },
        // Tag based on task_progress_id if provided
        ...(args.task_progress_id ? [{ type: 'Chapters' as const, id: args.task_progress_id }] : []),
        // General chapters tag
        { type: 'Chapters', id: 'LIST' },
      ],
    }),

    // Mutation endpoint to create chapter
    createChapter: builder.mutation<ApiResponse, { task_ref_id: string; body: CreateChapterPayload }>({
      query: ({ task_ref_id, body }) => {
        let url = CREATE_CHAPTER.replace(':task_ref_id', task_ref_id);
        return {
          url,
          method: POST,
          body,
        };
      },
      invalidatesTags: (result, error, { task_ref_id }) => [
        // Invalidate chapters for this specific task
        { type: 'Chapters' as const, id: task_ref_id },
        // Invalidate general chapters list
        { type: 'Chapters', id: 'LIST' },
        // Invalidate the specific monthly task
        { type: 'MonthlyTasks' as const, id: task_ref_id },
        // Invalidate all chapters
        'Chapters',
      ],
      // You can integrate with your notification system here
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          // show the message from response
          const { data } = await queryFulfilled;
          showNotification(data.message, 'success');
        } catch (error) {
          const { data } = await queryFulfilled;
          showNotification(data.message, 'error');
        }
      },
    }),

    // Mutation endpoint to update chapter progress
    updateChapterProgress: builder.mutation<ApiResponse, { 
      task_ref_id: string; 
      chapter_id: string; 
      body: UpdateChapterProgressPayload 
    }>({
      query: ({ task_ref_id, chapter_id, body }) => {
        let url = UPDATE_CHAPTER_PROGRESS.replace(':task_ref_id', task_ref_id).replace(':chapter_id', chapter_id);
        return {
          url,
          method: PUT,
          body,
        };
      },
      invalidatesTags: (result, error, { task_ref_id, chapter_id }) => [
        // Invalidate chapters for this specific task
        { type: 'Chapters' as const, id: task_ref_id },
        // Invalidate specific chapter
        { type: 'Chapters' as const, id: chapter_id },
        // Invalidate general chapters list
        { type: 'Chapters', id: 'LIST' },
        // Invalidate the specific monthly task
        { type: 'MonthlyTasks' as const, id: task_ref_id },
        // Invalidate all chapters
        'Chapters',
      ],
      // You can integrate with your notification system here
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          // show the message from response
          const { data } = await queryFulfilled;
          showNotification(data.message, 'success');
        } catch (error) {
          const { data } = await queryFulfilled;
          showNotification(data.message, 'error');
        }
      },
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useFetchMonthlyTasksQuery,
  useCreateMonthlyTaskMutation,
  useFetchChaptersQuery,
  useCreateChapterMutation,
  useUpdateChapterProgressMutation,
} = monthlyTaskApiSlice; 