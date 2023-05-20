import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';

console.log(getUserFromLocalStorage()?.mesocycles?.length);

const initialState = {
  isLoading: false,
  mesoName: `Meso ${getUserFromLocalStorage()?.mesocycles?.length + 1}`,
  microcycles: '',
  goal: '',
  startDate: '',
  startWeight: getUserFromLocalStorage()?.data?.weight || '',
  sessions: [
    /* {
      sessionName: 'Session 1',
      sessionNumber: 1,
      exercises: [{ muscleGroup: '', exerciseName: '', repRange: '' }],
    }, */
  ],
  sessionsCount: 0,
  isEditing: '',
};

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
        startWeight: getUserFromLocalStorage()?.data?.weight || '',
      };
    },
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
} = mesoSlice.actions;
