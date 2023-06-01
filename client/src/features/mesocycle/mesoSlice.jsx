import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { updateUser } from '../user/userSlice';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  mesoName: `Meso ${getUserFromLocalStorage()?.mesocycles?.length + 1 || 1}`,
  microcycles: '',
  goal: '',
  startDate: '',
  startWeight: getUserFromLocalStorage()?.data?.weight || '',
  setActive: false,
  sessions: [
    /* {
      sessionName: 'Session 1',
      sessionNumber: 1,
      exercises: [{ muscleGroup: '', exerciseName: '', repRange: '' }],
    }, */
  ],
  sessionsCount: 0,
  isEditing: false,
};

export const createMeso = createAsyncThunk(
  'mesocycles/createMeso',
  async (mesocycle, thunkAPI) => {
    try {
      const response = await customFetch.post('/mesocycles', mesocycle, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);

      // return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

//// this might be wrong, come back
export const editMeso = createAsyncThunk(
  'mesocycles/editMeso',
  async (mesocycle, thunkAPI) => {
    try {
      const response = await customFetch.patch(
        `/mesocycles/${mesocycle._id}`,
        mesocycle,
        {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const mesoSlice = createSlice({
  name: 'meso',
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
        exercises: [
          /* { muscleGroup: '', exerciseName: '', repRange: '' } */
        ],
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
      });
    },
    deleteExercise: (state, { payload: { sessionIndex, exerciseIndex } }) => {
      !state.sessions[sessionIndex].exercises[exerciseIndex].muscleGroup
        ? state.sessions[sessionIndex].exercises.splice(exerciseIndex, 1)
        : (state.sessions[sessionIndex].exercises[exerciseIndex] = {
            muscleGroup: '',
            exerciseName: '',
            repRange: '',
            notes: '',
          });
    },
    clearInputs: () => {
      return {
        ...initialState,
        mesoName: `Meso ${
          getUserFromLocalStorage()?.mesocycles?.length + 1 || 1
        }`,
      };
    },
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
        toast.success('Saved changes!');
      })
      .addCase(editMeso.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default mesoSlice.reducer;
export const {
  handleMesoChange,
  handleSessionChange,
  addSession,
  deleteSession,
  handleExerciseChange,
  addExercise,
  deleteExercise,
  clearInputs,
  setEditing,
} = mesoSlice.actions;
