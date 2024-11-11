import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosAPI from '../../../axiosAPI.ts';
import { RootState } from '../../app/store.ts';

interface todoState {
  value: string;
  isLoading: boolean;
  error: boolean;
  status: boolean;
}

const initialState: todoState = {
  value: '',
  isLoading: false,
  error: false,
  status: false
};

export const fetchTask = createAsyncThunk<void, void, {state: RootState}>("task/fetchTask", async (_arg, thunkApi) => {
  const task = thunkApi.getState().task.value;
  const status = thunkApi.getState().task.status;
  console.log(task);
  await axiosAPI.post("task.json", {task, status});
});

export const todoSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTask.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchTask.fulfilled, (state) => {
        state.isLoading = true;
      })
    .addCase(fetchTask.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  }
});

export const taskReducer = todoSlice.reducer;
export const {addTask} = todoSlice.actions;