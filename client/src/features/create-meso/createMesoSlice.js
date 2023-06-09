import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { deleteMeso } from '../mesocycles/mesocyclesSlice';
import { loginUser } from '../user/userSlice';
import { createMesoThunk, editMesoThunk } from './createMesoThunk';

const initialState = {
  isLoading: false,
  mesoName: `Meso ${
    getUserFromLocalStorage()?.stats?.totalMesocycles + 1 || 1
  }`,
  microcycles: '',
  goal: '',
  startDate: '',
  startWeight: getUserFromLocalStorage()?.data?.weight || '',
  setActive: false,
  sessions: [],
  sessionsCount: 0,
  mesoNotes: '',
  isEditing: false,
};

export const createMeso = createAsyncThunk(
  'mesocycles/createMeso',
  async (mesocycle, thunkAPI) => {
    return createMesoThunk('/mesocycles', mesocycle, thunkAPI);
  }
);

export const editMeso = createAsyncThunk(
  'mesocycles/editMeso',
  async (mesocycle, thunkAPI) => {
    return editMesoThunk(`/mesocycles/${mesocycle._id}`, mesocycle, thunkAPI);
  }
);

const createMesoSlice = createSlice({
  name: 'createMeso',
  initialState,
  reducers: {
    handleMesoChange: (state, { payload: { input, value } }) => {
      state[input] = value;
    },
    handleSessionChange: (
      state,
      { payload: { input, value, sessionIndex } }
    ) => {
      state.sessions[sessionIndex][input] = value;
    },
    addSession: (state) => {
      state.sessionsCount++;
      state.sessions.push({
        sessionsCount: state.sessionsCount,
        sessionName: `Session ${state.sessionsCount}`,
        exercises: [],
        sessionNotes: '',
      });
    },
    deleteSession: (state, { payload: { sessionIndex } }) => {
      state.sessionsCount--;
      state.sessions.splice(sessionIndex, 1);
    },
    handleExerciseChange: (
      state,
      { payload: { input, value, sessionIndex, exerciseIndex } }
    ) => {
      state.sessions[sessionIndex].exercises[exerciseIndex][input] = value;
    },
    addExercise: (state, { payload: { sessionIndex } }) => {
      state.sessions[sessionIndex].exercises.push({
        muscleGroup: '',
        exerciseName: '',
        repRange: '',
        sets: 2,
        exerciseNotes: '',
      });
    },
    deleteExercise: (state, { payload: { sessionIndex, exerciseIndex } }) => {
      !state.sessions[sessionIndex].exercises[exerciseIndex].muscleGroup
        ? state.sessions[sessionIndex].exercises.splice(exerciseIndex, 1)
        : (state.sessions[sessionIndex].exercises[exerciseIndex] = {
            muscleGroup: '',
            exerciseName: '',
            repRange: '',
            sets: 2,
            exerciseNotes: '',
          });
    },
    clearCreateMesoState: () => initialState,
    setEditing: (state, { payload }) => {
      return { ...initialState, ...payload, isEditing: true };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMeso.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMeso.fulfilled, (state) => {
        state.isLoading = false;
        state.mesoName = `Meso ${
          getUserFromLocalStorage()?.stats.totalMesocycles + 1
        }`;
        toast.success('Created mesocycle!');
      })
      .addCase(createMeso.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editMeso.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editMeso.fulfilled, (state) => {
        state.isLoading = false;
        state.mesoName = `Meso ${
          getUserFromLocalStorage()?.stats.totalMesocycles + 1
        }`;
        toast.success('Saved changes!');
      })
      .addCase(editMeso.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteMeso.fulfilled, (state) => {
        state.mesoName = `Meso ${
          getUserFromLocalStorage()?.stats.totalMesocycles + 1
        }`;
      })
      .addCase(loginUser.fulfilled, (state) => {
        return {
          ...initialState,
          mesoName: `Meso ${
            getUserFromLocalStorage()?.mesocycles?.length + 1 || 1
          }`,
          weight: getUserFromLocalStorage()?.data?.weight || '',
        };
      });
  },
});

export default createMesoSlice.reducer;
export const {
  handleMesoChange,
  handleSessionChange,
  addSession,
  deleteSession,
  handleExerciseChange,
  addExercise,
  deleteExercise,
  clearCreateMesoState,
  setEditing,
} = createMesoSlice.actions;
