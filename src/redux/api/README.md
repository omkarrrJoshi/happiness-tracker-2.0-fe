# RTK Query Setup for New APIs

This directory contains the RTK Query setup for new APIs. The existing saga-based API calls remain unchanged.

## Structure

- `baseApiSlice.ts` - Base API slice that provides the foundation for all new RTK Query endpoints
- `monthlyTaskApiSlice.ts` - Monthly task API implementation using RTK Query
- `tagExamples.ts` - Examples of different tag patterns and strategies
- `README.md` - This documentation file

## How to Create New API Endpoints

### 1. Create a New API Slice

Create a new file in this directory (e.g., `newFeatureApiSlice.ts`):

```typescript
import { baseApiSlice } from './baseApiSlice';
import { GET, POST, PUT, DELETE } from '../../constants/apis';

// Define your data types
interface NewFeatureData {
  id: string;
  name: string;
  // ... other properties
}

interface CreateNewFeaturePayload {
  name: string;
  // ... other properties
}

// Extend the base API slice
export const newFeatureApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query endpoint (GET request)
    getNewFeatures: builder.query<NewFeatureData[], void>({
      query: () => ({
        url: '/api/new-features', // Your actual endpoint
        method: GET,
      }),
      providesTags: ['NewFeatures'], // Add this tag to baseApiSlice tagTypes
    }),

    // Mutation endpoint (POST request)
    createNewFeature: builder.mutation<NewFeatureData, CreateNewFeaturePayload>({
      query: (body) => ({
        url: '/api/new-features',
        method: POST,
        body,
      }),
      invalidatesTags: ['NewFeatures'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetNewFeaturesQuery,
  useCreateNewFeatureMutation,
} = newFeatureApiSlice;
```

### 2. Add New Tag Types

If you're using new tag types, add them to the `tagTypes` array in `baseApiSlice.ts`:

```typescript
tagTypes: ['Tasks', 'User', 'Progress', 'Tracker', 'Examples', 'NewFeatures'],
```

### 3. Use in Components

```typescript
import React from 'react';
import { useGetNewFeaturesQuery, useCreateNewFeatureMutation } from '../redux/api/newFeatureApiSlice';

const NewFeatureComponent = () => {
  // Query hook - automatically handles loading, error, and data states
  const { data: features, isLoading, error } = useGetNewFeaturesQuery();
  
  // Mutation hook - returns a trigger function and status
  const [createFeature, { isLoading: isCreating }] = useCreateNewFeatureMutation();

  const handleCreate = async () => {
    try {
      await createFeature({ name: 'New Feature' }).unwrap();
      // Success! Cache will be automatically invalidated
    } catch (error) {
      // Handle error
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading features</div>;

  return (
    <div>
      {features?.map(feature => (
        <div key={feature.id}>{feature.name}</div>
      ))}
      <button onClick={handleCreate} disabled={isCreating}>
        {isCreating ? 'Creating...' : 'Create Feature'}
      </button>
    </div>
  );
};
```

## Advanced Tagging Strategies

### Tags Based on Query Parameters

You can create tags based on the parameters used in your API calls:

```typescript
fetchTasksByType: builder.query<Task[], { type: string; month: number; year: number }>({
  query: (args) => ({
    url: '/api/tasks',
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
```

### Tags Based on Body Parameters

For mutations, you can invalidate tags based on the request body:

```typescript
createTask: builder.mutation<Task, { type: string; pillar: string; user_id: string }>({
  query: (body) => ({
    url: '/api/tasks',
    method: POST,
    body
  }),
  invalidatesTags: (result, error, body) => [
    // Invalidate based on task type
    { type: 'Tasks' as const, id: body.type },
    // Invalidate based on pillar
    { type: body.pillar as any, id: 'LIST' },
    // Invalidate based on user
    { type: 'User' as const, id: body.user_id },
    // Invalidate general lists
    { type: 'Tasks' as const, id: 'LIST' },
    'Tasks'
  ]
})
```

### Tags Based on Response Data

You can also create tags based on the data returned from the API:

```typescript
getTaskDetails: builder.query<Task, string>({
  query: (id) => ({
    url: `/api/tasks/${id}`,
    method: GET
  }),
  providesTags: (result, error, id) => [
    // Tag based on the specific task ID
    { type: 'Tasks' as const, id },
    // Tag based on task type from response
    ...(result?.type ? [{ type: 'Tasks' as const, id: result.type }] : []),
    // Tag based on pillar from response
    ...(result?.pillar ? [{ type: result.pillar as any, id: result.id }] : [])
  ]
})
```

### Common Tag Patterns

1. **By ID**: `{ type: 'Entity', id: entityId }`
2. **By Type**: `{ type: 'Entity', id: entityType }`
3. **By Date**: `{ type: 'Entity', id: '2025-06' }`
4. **By User**: `{ type: 'Entity', id: userId }`
5. **By Status**: `{ type: 'Entity', id: 'status-active' }`
6. **By Category**: `{ type: 'Entity', id: 'category-spiritual' }`
7. **Combined**: `{ type: 'Entity', id: \`${type}-${month}-${year}\` }`
8. **List**: `{ type: 'Entity', id: 'LIST' }`
9. **All**: `'Entity'` (invalidates all tags of this type)

### Conditional Tags

You can conditionally add tags based on parameters:

```typescript
providesTags: (result, error, args) => {
  const tags = [
    // Always provide general tags
    { type: 'Tasks' as const, id: 'LIST' },
    { type: 'User' as const, id: args.user_id }
  ];

  // Conditionally add tags based on provided parameters
  if (args.type) {
    tags.push({ type: 'Tasks' as const, id: args.type });
  }
  
  if (args.pillar) {
    tags.push({ type: args.pillar as any, id: 'LIST' });
  }

  return tags;
}
```

## Benefits of RTK Query

1. **Automatic Caching** - Data is cached and shared across components
2. **Loading States** - Built-in `isLoading`, `isFetching`, `isSuccess`, `isError` states
3. **Cache Invalidation** - Automatic cache updates when data changes
4. **Optimistic Updates** - Update UI immediately while request is in flight
5. **Background Refetching** - Automatically refetch data when window regains focus
6. **Deduplication** - Multiple components requesting the same data share one request
7. **TypeScript Support** - Full type safety with auto-generated hooks

## Migration Strategy

- Keep existing saga-based APIs unchanged
- Use RTK Query for all new APIs
- Gradually migrate old APIs to RTK Query when time permits
- Both systems can coexist in the same application

## Best Practices

1. **Use Descriptive Tag Names** - Tag names should clearly identify the data they represent
2. **Invalidate Related Tags** - When updating data, invalidate all related tags
3. **Handle Errors Gracefully** - Always handle error states in your components
4. **Use Optimistic Updates** - For better UX, update the UI immediately for mutations
5. **Leverage Cache** - RTK Query's caching reduces unnecessary API calls
6. **Use Parameter-Based Tags** - Create granular tags based on query parameters and body data
7. **Validate Tag Types** - Use helper functions to ensure dynamic tag types are valid 