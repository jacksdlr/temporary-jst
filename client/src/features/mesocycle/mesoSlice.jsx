import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialState = {
  isLoading: false,
  startDate: '',
  startWeight: '',
  goalOptions: ['Select a goal', 'Bulk', 'Cut', 'Maintenance'],
  goal: '',
  microcycles: '',
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
    handleSessionChange: (state, { payload: { input, value, index } }) => {
      state.sessions[index][input] = value;
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
    deleteSession: (state, { payload: { index } }) => {
      state.sessionsCount--;
      state.sessions.splice(index, 1);
    },
    handleExerciseChange: (
      state,
      { payload: { input, value, sessionIndex, exerciseIndex } }
    ) => {
      state.sessions[sessionIndex].exercises[exerciseIndex][input] = value;
    },
    addExercise: (state, { payload: { index } }) => {
      state.sessions[index].exercises.push({
        muscleGroup: '',
        exerciseName: '',
        repRange: '',
      });
    },
    deleteExercise: (state, { payload: { sessionIndex, exerciseIndex } }) => {
      /* state.sessions[sessionIndex].exercises.length == 1
        ? (state.sessions[sessionIndex].exercises = [
            {
              muscleGroup: '',
              exerciseName: '',
              repRange: '',
            },
          ])
        :  */ state.sessions[sessionIndex].exercises.splice(exerciseIndex, 1);
    },
    clearInputs: () => {
      return {
        ...initialState,
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
