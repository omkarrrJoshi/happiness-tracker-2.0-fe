import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store'; // Adjust the import path if needed
import { AppState } from '../../types/stateTypes';

export const baseApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST + '/' + process.env.REACT_APP_API_VERSION,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as AppState;
      const userId = state.auth?.user?.uid;
      if (userId) {
        headers.set('user_id', userId);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: [
    'Tasks', 
    'User', 
    'Progress', 
    'Tracker', 
    'Examples', 
    'MonthlyTasks',
    'DailyTasks',
    'Chapters',
    'Spiritual',
    'Physical',
    'Mental',
    'Social',
    'Financial',
    'Environmental'
  ], // Add more tag types as needed
  endpoints: () => ({}), // Empty endpoints - will be extended by other slices
});

export default baseApiSlice; 