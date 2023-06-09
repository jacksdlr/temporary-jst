import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { directory } from '../../utils/directory';
import { getAllWorkoutsThunk, deleteWorkoutThunk } from './allWorkoutsThunk';

const initialFilters = {
  searchMesoId: '',
  searchMicrocycle: '',
  searchSession: '',
  searchStatus: 'All',
  statusOptions: ['Completed', 'Planned', 'Incomplete'],
  searchMuscle: 'All',
  muscleOptions: directory.map((item) => item.muscleGroup),
  sort: 'Default',
  sortOptions: ['', 'Default', 'Last Updated', 'Oldest'],
};

const initialState = {
  isLoading: false,
  workouts: [],
  totalWorkouts: 0,
  numberOfPages: 1,
  page: 1,
  stats: {},
  ...initialFilters,
};

// complete
export const getAllWorkouts = createAsyncThunk(
  'workouts/getAllWorkouts',
  getAllWorkoutsThunk
);

export const deleteWorkout = createAsyncThunk(
  'workouts/deleteWorkout',
  async ({ mesoId, workoutId }, thunkAPI) => {
    return deleteWorkoutThunk(`/workouts/${mesoId}/${workoutId}`, thunkAPI);
  }
);

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
    setSearch: (state, { payload }) => {
      return { ...initialState, ...payload };
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFilters };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllWorkoutsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWorkouts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWorkouts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.workouts = payload.workouts;
        state.totalWorkouts = payload.totalWorkouts;
        state.numberOfPages = payload.numberOfPages;
      })
      .addCase(getAllWorkouts.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.page = 1;
        toast.success('Deleted workout');
      })
      .addCase(deleteWorkout.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  setSearch,
  handleChange,
  clearFilters,
  changePage,
  clearAllWorkoutsState,
} = allWorkoutsSlice.actions;
export default allWorkoutsSlice.reducer;
