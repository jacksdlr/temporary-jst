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
    addSet: (state, { payload: { newSet, id } }) => {
      const exercise = state.workout.exercises.find(
        (exercise) => exercise._id == id
      );
      // state.workout.exercises[exerciseIndex].sets.push(newSet);
      exercise.sets.push(newSet);
      // exercise.performanceScore++;
    },
    clearWorkoutState: () => initialState,
    getCurrentExercise: (state) => {
      // abandoned?
      state.workout.exercises.map((exercise, index) => {
        let count = 0;
        exercise.sets.map((set) => {
          if (set.weight || set.repetitions || set.repsInReserve) {
            count++;
          }
        });
        if (count == exercise.sets.length) {
          state.currentExerciseIndex = index;
          return;
        }
      });
    },
    setPrevWeights: (state) => {
      state.workout.exercises.map((exercise) => {
        if (exercise.changeWeight) {
          exercise.sets.map((set) => {
            set.prevWeight = set.weight;
          });
        }
      });
    },
    openRecoveryModal: (state) => {
      state.recoveryModal.isOpen = true;
    },
    closeRecoveryModal: (state) => {
      state.recoveryModal.isOpen = false;
    },
    setRecoveryScore: (state, { payload: { muscleGroup, recoveryScore } }) => {
      state.recoveryModal[muscleGroup] = recoveryScore;
    },
    // THIS IS BACKEND FOR NOW, UNSURE HOW TO MAKE IT DISPATCH ON FORM SUBMIT BUT BEFORE SENDING DATA
    // calculateScores: (state) => {
    //   state.workout.exercises.map((exercise, index) => {
    //     const repRangeLower = Number(exercise.repRange.match(/^\d+/)[0]);
    //     const repRangeUpper = Number(exercise.repRange.match(/\d+$/)[0]);

    //     state.workout.exercises[index].performanceScore = 0;

    //     state.workout.exercises[index].lessThanMinRepsSets = 0;

    //     exercise.sets.map((set) => {
    //       if (set.repetitions < repRangeLower) {
    //         state.workout.exercises[index].lessThanMinRepsSets++;
    //       }
    //     });
    //     exercise.sets.map((set, setIndex) => {
    //       if (
    //         set.repetitions >= repRangeUpper &&
    //         exercise.lessThanMinRepsSets == 0
    //       ) {
    //         state.workout.exercises[index].changeWeight = 'Increase';
    //       } else if (set.repetitions < 5) {
    //         state.workout.exercises[index].changeWeight = 'Decrease';
    //       } /*  else if (sets[i].repsInReserve <= sets[i].targetRIR - 2) {
    //       changeWeight = 'Decrease';
    //     } */
    //     });

    //     if (exercise.lessThanMinRepsSets == exercise.sets.length) {
    //       state.workout.exercises[index].changeWeight = 'Decrease';
    //     } else {
    //       exercise.sets.map((set, setIndex) => {
    //         const { repetitions, targetReps, repsInReserve, targetRIR } = set;

    //         // Depending on repetitions achieved and reps in reserve, a performance score is allocated
    //         // At the moment they are very strict, a single set bring the score down

    //         if (
    //           ((repetitions > targetReps + 1 && repsInReserve >= targetRIR) ||
    //             (repetitions >= targetReps && repsInReserve > targetRIR + 1)) &&
    //           state.workout.exercises[index].performanceScore != 4
    //         ) {
    //           state.workout.exercises[index].performanceScore = 1;
    //         } else if (
    //           ((repetitions == targetReps + 1 && repsInReserve == targetRIR) ||
    //             (repetitions == targetReps && repsInReserve == targetRIR + 1) ||
    //             (repetitions == targetReps && repsInReserve == targetRIR)) &&
    //           state.workout.exercises[index].performanceScore != 4
    //         ) {
    //           state.workout.exercises[index].performanceScore = 2;
    //         } else if (
    //           repetitions == targetReps &&
    //           repsInReserve < targetRIR &&
    //           state.workout.exercises[index].performanceScore != 4
    //         ) {
    //           state.workout.exercises[index].performanceScore = 3;
    //         } else if (repetitions < targetReps) {
    //           // too strict for first week
    //           state.workout.exercises[index].performanceScore = 4;
    //         }
    //       });
    //     }
    //   });
    // },
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
  // calculateScores,
} = workoutSlice.actions;

export default workoutSlice.reducer;
