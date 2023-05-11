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
  sessions: [],
  sessionsNumber: 0,
  isEditing: '',
};

const mesoSlice = createSlice({
  name: 'meso',
  initialState,
  reducers: {
    handleChange: (state, { payload: { input, value } }) => {
      state[input] = value;
    },
    clearInputs: () => {
      return {
        ...initialState,
      };
    },
    addSession: (state) => {
      state.sessionsNumber++;
      state.sessions.push({ sessionNumber: state.sessionsNumber });
    },
  },
});

export default mesoSlice.reducer;
export const { handleChange, clearInputs, addSession } = mesoSlice.actions;
