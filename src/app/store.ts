import { configureStore } from '@reduxjs/toolkit';
import { taskReducer } from '../containers/ToDo/todoSlice.ts';

export const store = configureStore({
  reducer: {
    task: taskReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;