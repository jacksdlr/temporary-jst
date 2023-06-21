import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getNextWorkoutThunk, getWorkoutThunk } from './workoutThunk';

const initialState = {
  isLoading: false,
  workout: null,
};

export const getNextWorkout = createAsyncThunk(
  'workouts/nextWorkout',
  getNextWorkoutThunk
);

export const getWorkout = createAsyncThunk(
  'workouts/getWorkout',
  async ({ mesoId, workoutId }, thunkAPI) => {
    return getWorkoutThunk(`/workouts/${mesoId}/${workoutId}`, thunkAPI);
  }
);

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleSetChange: (
      state,
      { payload: { input, value, exerciseIndex, setIndex } }
    ) => {
      state.workout.exercises[exerciseIndex].sets[setIndex][input] = value;
    },
    clearWorkoutState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNextWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNextWorkout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.workout = payload.workout;
      })
      .addCase(getNextWorkout.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload);
      })
      .addCase(getWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.workout = payload.workout;
      })
      .addCase(getWorkout.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload);
      });
  },
});

export const { showLoading, hideLoading, handleSetChange, clearWorkoutState } =
  workoutSlice.actions;
export default workoutSlice.reducer;
