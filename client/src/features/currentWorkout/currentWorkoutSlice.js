import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { getCurrentWorkoutThunk } from './currentWorkoutThunk';

const initialState = {
  isLoading: false,
  workout: null,
};

export const getCurrentWorkout = createAsyncThunk(
  'workouts/currentWorkout',
  getCurrentWorkoutThunk
);

const currentWorkoutSlice = createSlice({
  name: 'currentWorkout',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentWorkout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.workout = payload.workout;
      })
      .addCase(getCurrentWorkout.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { showLoading, hideLoading } = currentWorkoutSlice.actions;
export default currentWorkoutSlice.reducer;
