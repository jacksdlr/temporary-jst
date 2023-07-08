import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { getAllMesocyclesThunk, deleteMesoThunk } from './mesocyclesThunk';

const initialFilters = {
  search: '',
  searchStatus: 'All',
  statusOptions: ['Completed', 'Planned', 'Active', 'Incomplete'],
  searchGoal: 'All',
  goalOptions: ['Bulk', 'Cut', 'Maintenance'],
  searchMicrocycles: '',
  sort: 'Default',
  sortOptions: ['', 'Default', 'Last Updated', 'Oldest'],
};

const initialState = {
  isLoading: false,
  mesocycles: [],
  totalMesocycles: 0,
  numberOfPages: 1,
  page: 1,
  stats: {},
  ...initialFilters,
};

export const getAllMesocycles = createAsyncThunk(
  'mesocycles/getMesocycles',
  getAllMesocyclesThunk
);

export const deleteMeso = createAsyncThunk(
  'mesocycles/deleteMeso',
  async (mesoId, thunkAPI) => {
    return deleteMesoThunk(`/mesocycles/${mesoId}`, thunkAPI);
  }
);

const mesocyclesSlice = createSlice({
  name: 'mesocycles',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
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
    clearMesocyclesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMesocycles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMesocycles.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.mesocycles = payload.mesocycles;
        state.totalMesocycles = payload.totalMesocycles;
        state.numberOfPages = payload.numberOfPages;
      })
      .addCase(getAllMesocycles.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteMeso.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMeso.fulfilled, (state) => {
        state.isLoading = false;
        state.page = 1;
        toast.success('Deleted mesocycle');
      })
      .addCase(deleteMeso.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearMesocyclesState,
} = mesocyclesSlice.actions;
export default mesocyclesSlice.reducer;
