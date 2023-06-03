import customFetch from '../../utils/axios';
import { showLoading, hideLoading, getAllWorkouts } from './allWorkoutsSlice';
// import { authHeader } from '../../utils/authHeader';

export const getAllWorkoutsThunk = async (_, thunkAPI) => {
  const { searchStatus, mesoName, sessionName } =
    thunkAPI.getState().allWorkouts;

  let url = `/workouts?status=${searchStatus}`;

  if (mesoName) {
    url = url + `&mesoName=${mesoName}`;
  }
  if (sessionName) {
    url = url + `&sessionName=${sessionName}`;
  }

  try {
    const response = await customFetch.get(url /* , authHeader(thunkAPI) */);
    return response.data.workouts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteWorkoutThunk = async (url, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const response = await customFetch.delete(url /* , authHeader(thunkAPI) */);
    thunkAPI.dispatch(getAllWorkouts());
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getCurrentWorkoutThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/workouts/currentWorkout'); // go to backend
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
