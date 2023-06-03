import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import {
  getAllWorkoutsThunk,
  deleteWorkoutThunk,
  getCurrentWorkoutThunk,
} from './allWorkoutsThunk';

const initialFilters = {
  mesoName: '',
  sessionName: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'last updated',
  sortOptions: ['last updated', 'oldest', 'mesocycle', 'session'],
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

// for front end dev
/* export const getAllWorkouts = createAsyncThunk(
  'allWorkouts/getWorkouts',
  async (_, thunkAPI) => {
    try {
      const workouts = [];
      getUserFromLocalStorage()?.mesocycles?.map((mesocycle) =>
        mesocycle.sessions.map((session) =>
          workouts.push({
            mesoName: mesocycle.mesoName,
            _id: session._id,
            microcycle: session.microcycle,
            sessionNumber: session.sessionNumber,
            dayCompleted: session.dayCompleted,
            status: session.status,
            musclesTrained: session.musclesTrained,
            exercises: session.exercises,
            comments: session.comments,
            updatedAt: session.updatedAt,
          })
        )
      );
      return workouts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
); */

// complete
export const getAllWorkouts = createAsyncThunk(
  'workouts/getAllWorkouts',
  getAllWorkoutsThunk
  /* async (_, thunkAPI) => {
    return getAllWorkoutsThunk('/workouts', thunkAPI);
    // const { searchStatus, mesoName, sessionName } =
    //   thunkAPI.getState().allWorkouts;

    // let url = `/workouts?status=${searchStatus}`;

    // if (mesoName) {
    //   url = url + `&mesoName=${mesoName}`;
    // }
    // if (sessionName) {
    //   url = url + `&sessionName=${sessionName}`;
    // }

    // try {
    //   const response = await customFetch.get(url, {
    //     headers: {
    //       authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    //     },
    //   });
    //   return response.data.workouts;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error.response.data.msg);
    // }
  } */
);

export const deleteWorkout = createAsyncThunk(
  'workouts/deleteWorkout',
  async ({ mesoId, workoutId }, thunkAPI) => {
    return deleteWorkoutThunk(`/workouts/${mesoId}/${workoutId}`, thunkAPI);
    // thunkAPI.dispatch(showLoading());
    // try {
    //   const response = await customFetch.delete(
    //     `/workouts/${mesoId}/${workoutId}`,
    //     {
    //       headers: {
    //         authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    //       },
    //     }
    //   );
    //   thunkAPI.dispatch(getAllWorkouts());
    //   return response.data;
    // } catch (error) {
    //   thunkAPI.dispatch(hideLoading());
    //   return thunkAPI.rejectWithValue(error.response.data.msg);
    // }
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
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success('Deleted workout');
      })
      .addCase(deleteWorkout.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { showLoading, hideLoading, setSearch, clearState } =
  allWorkoutsSlice.actions;
export default allWorkoutsSlice.reducer;
