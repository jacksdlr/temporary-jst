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

export const getAllWorkouts = createAsyncThunk(
  'allWorkouts/getWorkouts',
  async (_, thunkAPI) => {
    try {
      const workouts = [];
      getUserFromLocalStorage()?.mesocycles?.map((mesocycle) =>
        workouts.push({
          mesoName: mesocycle.mesoName,
          sessions: [...mesocycle.sessions],
        })
      );
      return workouts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  isLoading: false,
  workouts: [],
  totalWorkouts: 0,
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
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWorkouts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWorkouts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.workouts = payload;
        state.totalWorkouts = payload.length;
      })
      .addCase(getAllWorkouts.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { showLoading, hideLoading } = allWorkoutsSlice.actions;
export default allWorkoutsSlice.reducer;
