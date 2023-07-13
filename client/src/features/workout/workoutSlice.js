import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getWorkoutFromLocalStorage } from '../../utils/localStorage';
import { createMeso, editMeso } from '../create-meso/createMesoSlice';
import { loginUser } from '../user/userSlice';
import { getWorkoutThunk, updateWorkoutThunk } from './workoutThunk';

const initialState = {
  isLoading: false,
  workout: getWorkoutFromLocalStorage(),
  recoveryModal: {
    isOpen: true,
  },
};

export const getWorkout = createAsyncThunk(
  'workouts/getWorkout',
  async ({ mesoId, workoutId }, thunkAPI) => {
    return getWorkoutThunk(`/workouts/${mesoId}/${workoutId}`, thunkAPI);
  }
);

export const updateWorkout = createAsyncThunk(
  'workouts/updateWorkout',
  async ({ mesoId, workout, isCurrentWorkout }, thunkAPI) => {
    return updateWorkoutThunk(
      `/workouts/${workout.mesoId}/${workout._id}`,
      workout,
      isCurrentWorkout,
      thunkAPI
    );
  }
);

/* export const skipWorkout = createAsyncThunk(
  'workouts/skipWorkout',
  async ({ mesoId, workout }, thunkAPI) => {
    return skipWorkoutThunk(
      `/workouts/${mesoId}/${workout._id}`,
      workout,
      thunkAPI
    );
  }
); */

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
    skipWorkout: (state) => {
      toast.warning('Feature in development...');
    },
    addExercise: (state, { payload: exercise }) => {
      let existingMuscle = state.workout.musclesTrained.find(
        (muscle) => muscle == exercise.muscleGroup
      );
      if (!existingMuscle) {
        state.workout.musclesTrained.push(exercise.muscleGroup);
      }

      let sets = [];
      for (let i = 0; i < exercise.sets; i++) {
        sets.push({
          targetReps: exercise.repRange.match(/^\d+/)[0],
          targetRIR: state.workout.exercises[0].sets[0].targetRIR,
          newSet: true,
        });
      }

      state.workout.exercises.push({
        exerciseName: exercise.exerciseName,
        repRange: exercise.repRange,
        muscleGroup: exercise.muscleGroup,
        sets,
        notes: exercise.note != '' ? [exercise.note] : [],
      });

      toast.success(`Added ${exercise.exerciseName} to the workout!`);
    },
    addWorkoutNote: (state, { payload }) => {
      state.workout.notes.push(payload);
      toast.success('Added workout note!');
    },
    addExerciseBefore: (state, { payload: { exercise, exerciseIndex } }) => {
      let existingMuscle = state.workout.musclesTrained.find(
        (muscle) => muscle == exercise.muscleGroup
      );
      if (!existingMuscle) {
        state.workout.musclesTrained.push(exercise.muscleGroup);
      }

      let sets = [];
      for (let i = 0; i < exercise.sets; i++) {
        sets.push({
          targetReps: exercise.repRange.match(/^\d+/)[0],
          targetRIR: state.workout.exercises[0].sets[0].targetRIR,
          newSet: true,
        });
      }

      state.workout.exercises.splice(exerciseIndex, 0, {
        exerciseName: exercise.exerciseName,
        repRange: exercise.repRange,
        muscleGroup: exercise.muscleGroup,
        sets,
        notes: exercise.note != '' ? [exercise.note] : [],
      });

      toast.success(
        `Added ${exercise.exerciseName} before ${
          state.workout.exercises[exerciseIndex + 1].exerciseName
        }!`
      );
    },
    addExerciseAfter: (state, { payload: { exercise, exerciseIndex } }) => {
      let existingMuscle = state.workout.musclesTrained.find(
        (muscle) => muscle == exercise.muscleGroup
      );
      if (!existingMuscle) {
        state.workout.musclesTrained.push(exercise.muscleGroup);
      }

      let sets = [];
      for (let i = 0; i < exercise.sets; i++) {
        sets.push({
          targetReps: exercise.repRange.match(/^\d+/)[0],
          targetRIR: state.workout.exercises[0].sets[0].targetRIR,
          newSet: true,
        });
      }

      state.workout.exercises.splice(exerciseIndex + 1, 0, {
        exerciseName: exercise.exerciseName,
        repRange: exercise.repRange,
        muscleGroup: exercise.muscleGroup,
        sets,
        notes: exercise.note != '' ? [exercise.note] : [],
      });

      toast.success(
        `Added ${exercise.exerciseName} after ${state.workout.exercises[exerciseIndex].exerciseName}!`
      );
    },
    addSet: (state, { payload: { newSet, id, exerciseIndex } }) => {
      if (id) {
        const exercise = state.workout.exercises.find(
          (exercise) => exercise._id == id
        );
        exercise.sets.push(newSet);
      } else {
        state.workout.exercises[exerciseIndex].sets.push(newSet);
      }
      // exercise.performanceScore++;
    },
    removeSet: (state, { payload: { exerciseIndex } }) => {
      if (state.workout.exercises[exerciseIndex].sets.length == 1) {
        toast.error('You cannot remove the last set of an exercise...');
      } else {
        state.workout.exercises[exerciseIndex].sets.pop();
        toast.success(`Removed set!`);
      }
    },
    addExerciseNote: (state, { payload: { exerciseIndex, note } }) => {
      state.workout.exercises[exerciseIndex].notes.push(note);
      toast.success('Added note!');
    },
    disableSetProgression: (state, { payload: { exerciseIndex } }) => {
      state.workout.exercises[exerciseIndex].disableSetProgression =
        !state.workout.exercises[exerciseIndex].disableSetProgression;
      toast.success(
        `${
          !state.workout.exercises[exerciseIndex].disableSetProgression
            ? 'Enabled'
            : 'Disabled'
        } set progression!`
      );
    },
    removeExercise: (state, { payload: { exerciseIndex } }) => {
      if (state.workout.exercises.length == 1) {
        toast.error('You cannot remove the last exercise of a workout...');
      } else {
        state.workout.exercises.splice(exerciseIndex, 1);
        state.workout.musclesTrained.forEach((muscle, index) => {
          const existingExercise = state.workout.exercises.find(
            (exercise) => exercise.muscleGroup == muscle
          );
          if (!existingExercise) {
            state.workout.musclesTrained.splice(index, 1);
          }
        });
        toast.success('Removed exercise!');
      }
    },
    clearWorkoutState: () => initialState,
    setNextWorkout: (state, { payload: { workout } }) => {
      return {
        ...initialState,
        workout,
      };
    },
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
      .addCase(getWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkout.fulfilled, (state, { payload }) => {
        state.recoveryModal = {
          isOpen: false,
        };
        state.isLoading = false;
        state.workout = payload.workout;
      })
      .addCase(getWorkout.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateWorkout.fulfilled,
        (state, { payload: { workout, msg } }) => {
          toast.success(msg);
          return { ...initialState, workout };
        }
      )
      .addCase(createMeso.fulfilled, (state, { payload: { workout } }) => {
        return { ...initialState, workout };
      })
      .addCase(editMeso.fulfilled, (state, { payload: { workout } }) => {
        return { ...initialState, workout };
      })
      .addCase(updateWorkout.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.fulfilled, (state, { payload: { workout } }) => {
        state.workout = workout;
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleSetChange,
  skipWorkout,
  addExercise,
  addWorkoutNote,
  addExerciseBefore,
  addExerciseAfter,
  addSet,
  removeSet,
  addExerciseNote,
  disableSetProgression,
  removeExercise,
  clearWorkoutState,
  setNextWorkout,
  getCurrentExercise,
  setPrevWeights,
  openRecoveryModal,
  closeRecoveryModal,
  setRecoveryScore,
  getNextWorkoutName,
} = workoutSlice.actions;

export default workoutSlice.reducer;
