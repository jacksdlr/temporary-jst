import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';

const initialFilters = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'last updated',
  sortOptions: ['last updated', 'oldest', 'mesocycle', 'session'],
};

const workouts = getUserFromLocalStorage().mesocycles.map(
  (mesocycle) => mesocycle.sessions
)[0];

const initialState = {
  isLoading: false,
  workouts: workouts || [],
  totalWorkouts: workouts?.length || 0,
  numberOfPages: 1,
  page: 1,
  stats: {},
  ...initialFilters,
};

/* export const getAllWorkouts = createAsyncThunk(
  'allWorkouts/getWorkouts',
  async (_, thunkAPI) => {
    let url = `/workouts`;

    try {
      const response = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
); */

const allWorkoutsSlice = createSlice({
  name: 'allWorkouts',
  initialState,
  /* extraReducers: (builder) => {
    builder
      .addCase(getAllWorkouts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWorkouts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.workouts = payload.workouts;
        state.totalWorkouts = payload.workouts.length;
      })
      .addCase(getAllWorkouts.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }, */
});

export default allWorkoutsSlice.reducer;
