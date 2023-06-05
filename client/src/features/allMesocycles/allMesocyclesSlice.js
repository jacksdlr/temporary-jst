import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { getAllMesocyclesThunk, deleteMesoThunk } from './allMesocyclesThunk';

const initialFilters = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'last updated',
  sortOptions: ['last updated', 'oldest', 'mesocycle'],
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

// for front end dev
/* export const getAllMesocycles = createAsyncThunk(
  'allMesocycles/getMesocycles',
  async (_, thunkAPI) => {
    try {
      return getUserFromLocalStorage()?.mesocycles
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
); */

// complete
export const getAllMesocycles = createAsyncThunk(
  'mesocycles/getMesocycles',
  getAllMesocyclesThunk
  /* async (_, thunkAPI) => {
    return getAllMesocyclesThunk('/mesocycles', thunkAPI);
    // try {
    //   const response = await customFetch.get('/mesocycles', {
    //     headers: {
    //       authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    //     },
    //   });
    //   return response.data;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error.response.data.msg);
    // }
  } */
);

export const deleteMeso = createAsyncThunk(
  'mesocycles/deleteMeso',
  async (mesoId, thunkAPI) => {
    return deleteMesoThunk(`/mesocycles/${mesoId}`, thunkAPI);
    // thunkAPI.dispatch(showLoading());
    // try {
    //   const response = await customFetch.delete(`/mesocycles/${mesoId}`, {
    //     headers: {
    //       authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    //     },
    //   });
    //   thunkAPI.dispatch(getAllMesocycles());
    //   return response.data;
    // } catch (error) {
    //   thunkAPI.dispatch(hideLoading());
    //   return thunkAPI.rejectWithValue(error.response.data.msg);
    // }
  }
);

const allMesocyclesSlice = createSlice({
  name: 'allMesocycles',
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
      .addCase(getAllMesocycles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMesocycles.fulfilled, (state, { payload }) => {
        const { mesocycles } = payload;
        state.isLoading = false;
        state.mesocycles = mesocycles;
        state.totalMesocycles = mesocycles.length;
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
        toast.success('Deleted mesocycle');
      })
      .addCase(deleteMeso.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { showLoading, hideLoading } = allMesocyclesSlice.actions;
export default allMesocyclesSlice.reducer;