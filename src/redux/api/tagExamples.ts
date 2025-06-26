// This file demonstrates different patterns for using tags based on parameters
// You can use these patterns in your actual API slices

import { baseApiSlice } from './baseApiSlice';
import { GET, POST, PUT, DELETE } from '../../constants/apis';

// Define valid tag types
type ValidTagTypes = 'Tasks' | 'User' | 'Progress' | 'Tracker' | 'Examples' | 'MonthlyTasks' | 'DailyTasks' | 'Spiritual' | 'Physical' | 'Mental' | 'Social' | 'Financial' | 'Environmental';

// Example 1: Tags based on query parameters
export const queryParamTagsExample = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasksByType: builder.query<any, { type: string; month: number; year: number }>({
      query: (args) => ({
        url: `/api/tasks`,
        method: GET,
        queryParams: new Map([
          ['type', args.type],
          ['month', args.month.toString()],
          ['year', args.year.toString()]
        ])
      }),
      providesTags: (result, error, args) => [
        // Tag based on query parameters
        { type: 'Tasks' as const, id: `${args.type}-${args.month}-${args.year}` },
        // Tag based on just the type
        { type: 'Tasks' as const, id: args.type },
        // Tag based on just the month-year
        { type: 'Tasks' as const, id: `${args.month}-${args.year}` },
        // General tag
        { type: 'Tasks' as const, id: 'LIST' }
      ]
    })
  })
});

// Example 2: Tags based on body parameters
export const bodyParamTagsExample = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<any, { 
      type: string; 
      pillar: string; 
      user_id: string; 
      target: number 
    }>({
      query: (body) => ({
        url: `/api/tasks`,
        method: POST,
        body
      }),
      invalidatesTags: (result, error, body) => [
        // Invalidate based on task type
        { type: 'Tasks' as const, id: body.type },
        // Invalidate based on pillar (only if it's a valid tag type)
        ...(isValidTagType(body.pillar) ? [{ type: body.pillar as ValidTagTypes, id: 'LIST' }] : []),
        // Invalidate based on user
        { type: 'User' as const, id: body.user_id },
        // Invalidate general lists
        { type: 'Tasks' as const, id: 'LIST' },
        'Tasks'
      ]
    })
  })
});

// Example 3: Tags based on response data
export const responseDataTagsExample = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTaskDetails: builder.query<any, string>({
      query: (id) => ({
        url: `/api/tasks/${id}`,
        method: GET
      }),
      providesTags: (result, error, id) => [
        // Tag based on the specific task ID
        { type: 'Tasks' as const, id },
        // Tag based on task type from response
        ...(result?.type ? [{ type: 'Tasks' as const, id: result.type }] : []),
        // Tag based on pillar from response (only if it's a valid tag type)
        ...(result?.pillar && isValidTagType(result.pillar) ? [{ type: result.pillar as ValidTagTypes, id: result.id }] : [])
      ]
    })
  })
});

// Example 4: Complex tag patterns
export const complexTagsExample = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateTaskProgress: builder.mutation<any, { 
      id: string; 
      progress: number; 
      type: string; 
      pillar: string 
    }>({
      query: ({ id, ...body }) => ({
        url: `/api/tasks/${id}/progress`,
        method: PUT,
        body
      }),
      invalidatesTags: (result, error, { id, type, pillar }) => [
        // Invalidate the specific task
        { type: 'Tasks' as const, id },
        // Invalidate tasks of the same type
        { type: 'Tasks' as const, id: type },
        // Invalidate tasks of the same pillar (only if it's a valid tag type)
        ...(isValidTagType(pillar) ? [{ type: pillar as ValidTagTypes, id: 'LIST' }] : []),
        // Invalidate progress data
        { type: 'Progress' as const, id },
        { type: 'Progress' as const, id: type },
        // Invalidate general lists
        { type: 'Tasks' as const, id: 'LIST' },
        'Progress'
      ]
    })
  })
});

// Example 5: Conditional tags based on parameters
export const conditionalTagsExample = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFilteredTasks: builder.query<any, { 
      type?: string; 
      pillar?: string; 
      status?: string;
      user_id: string;
    }>({
      query: (args) => ({
        url: `/api/tasks`,
        method: GET,
        queryParams: new Map(
          Object.entries(args).filter(([_, value]) => value !== undefined)
        )
      }),
      providesTags: (result, error, args) => {
        const tags: Array<{ type: ValidTagTypes; id: string } | ValidTagTypes> = [
          // Always provide general tags
          { type: 'Tasks', id: 'LIST' },
          { type: 'User', id: args.user_id }
        ];

        // Conditionally add tags based on provided parameters
        if (args.type) {
          tags.push({ type: 'Tasks', id: args.type });
        }
        
        if (args.pillar && isValidTagType(args.pillar)) {
          tags.push({ type: args.pillar as ValidTagTypes, id: 'LIST' });
        }
        
        if (args.status) {
          tags.push({ type: 'Tasks', id: `status-${args.status}` });
        }

        // Add tags for individual items from response
        if (result?.data) {
          result.data.forEach((item: any) => {
            tags.push({ type: 'Tasks', id: item.id });
            if (item.type) {
              tags.push({ type: 'Tasks', id: item.type });
            }
          });
        }

        return tags;
      }
    })
  })
});

// Helper function to check if a string is a valid tag type
function isValidTagType(type: string): type is ValidTagTypes {
  const validTypes: ValidTagTypes[] = [
    'Tasks', 'User', 'Progress', 'Tracker', 'Examples', 'MonthlyTasks', 
    'DailyTasks', 'Spiritual', 'Physical', 'Mental', 'Social', 'Financial', 'Environmental'
  ];
  return validTypes.includes(type as ValidTagTypes);
}

// Common tag patterns you can use:

/*
1. By ID: { type: 'Entity', id: entityId }
2. By Type: { type: 'Entity', id: entityType }
3. By Date: { type: 'Entity', id: '2025-06' }
4. By User: { type: 'Entity', id: userId }
5. By Status: { type: 'Entity', id: 'status-active' }
6. By Category: { type: 'Entity', id: 'category-spiritual' }
7. Combined: { type: 'Entity', id: `${type}-${month}-${year}` }
8. List: { type: 'Entity', id: 'LIST' }
9. All: 'Entity' (invalidates all tags of this type)
*/ 