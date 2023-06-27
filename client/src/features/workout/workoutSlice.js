import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getNextWorkoutThunk,
  getWorkoutThunk,
  updateWorkoutThunk,
} from './workoutThunk';

const initialState = {
  isLoading: false,
  workout: null,
  mesoId: null,
  recoveryModal: {
    isOpen: true,
  },
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

export const updateWorkout = createAsyncThunk(
  'workouts/updateWorkout',
  async ({ mesoId, workout }, thunkAPI) => {
    return updateWorkoutThunk(
      `/workouts/${mesoId}/${workout._id}`,
      workout,
      thunkAPI
    );
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
      if (input == 'weight') {
        for (
          let i = setIndex;
          i < state.workout.exercises[exerciseIndex].sets.length;
          i++
        ) {
          state.workout.exercises[exerciseIndex].sets[i][input] = value;
        }
      } else {
        state.workout.exercises[exerciseIndex].sets[setIndex][input] = value;
      }
    },
    addSet: (state, { payload: { newSet, exerciseIndex } }) => {
      state.workout.exercises[exerciseIndex].sets.push(newSet);
    },
    clearWorkoutState: () => initialState,
    getCurrentExercise: (state) => {
      state.workout.exercises.map((exercise, index) => {
        let count = 0;
        for (let i = 0; i < exercise.sets.length; i++) {
          if (
            !exercise.sets[i].weight ||
            !exercise.sets[i].repetitions ||
            !exercise.sets[i].repsInReserve
          ) {
            count++;
          }
        }
        if (count == exercise.sets.length) {
          state.currentExerciseIndex = index;
          return;
        }
      });
    },
    setPrevWeights: (state) => {
      for (let i = 0; i < state.workout.exercises; i++) {
        if (state.workout.exercises[i].changeWeight) {
          for (let j = 0; j < state.workout.exercises[i].sets; j++) {
            state.workout.exercises[i].sets[j].prevWeight =
              state.workout.exercises[i].sets[j].weight;
          }
        }
      }
    },
    openRecoveryModal: (state) => {
      state.recoveryModal.isOpen = true;
    },
    closeRecoveryModal: (state) => {
      state.recoveryModal.isOpen = false;
    },
    setRecoveryScore: (state, { payload: { muscle, score } }) => {
      state.recoveryModal[muscle] = score;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNextWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNextWorkout.fulfilled, (state, { payload }) => {
        state.recoveryModal = {
          isOpen: true,
        };
        state.isLoading = false;
        state.workout = payload.workout;
        state.mesoId = payload.mesoId;
      })
      .addCase(getNextWorkout.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload);
      })
      .addCase(getWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkout.fulfilled, (state, { payload }) => {
        state.recoveryModal = {
          isOpen: false,
        };
        state.isLoading = false;
        state.workout = payload.workout;
        state.mesoId = payload.mesoId;
      })
      .addCase(getWorkout.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload);
      })
      .addCase(updateWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWorkout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.workout = payload.workout;
        state.mesoId = payload.mesoId;
      })
      .addCase(updateWorkout.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleSetChange,
  addSet,
  clearWorkoutState,
  getCurrentExercise,
  setPrevWeights,
  openRecoveryModal,
  closeRecoveryModal,
  setRecoveryScore,
} = workoutSlice.actions;

export default workoutSlice.reducer;
