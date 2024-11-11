import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosAPI from '../../../axiosAPI.ts';
import { RootState } from '../../app/store.ts';

interface todoState {
  title: string;
  isLoading: boolean;
  error: boolean;
  status: boolean;
}

const initialState: todoState = {
  title: '',
  isLoading: false,
  error: false,
  status: false
};

export const fetchTask = createAsyncThunk<void, { title: string, status: boolean }, {state: RootState}>("task/fetchTask", async (_arg) => {
  const title = _arg.title;
  const status = _arg.status;
  await axiosAPI.post("task.json", {title, status});
});

export const fetchFromFireBase = createAsyncThunk("task/fetchFromFireBase", async () => {
  const {data:task} = await axiosAPI("task.json");
  return task;
});


export const todoSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
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
    })
  .addCase(fetchFromFireBase.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    })
      .addCase(fetchFromFireBase.fulfilled, (state, action) => {
        state.isLoading = true;
        state.title = action.payload;
      })
      .addCase(fetchFromFireBase.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  }
});

export const taskReducer = todoSlice.reducer;
export const {addTask} = todoSlice.actions;