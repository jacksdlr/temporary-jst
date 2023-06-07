import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { showLoading, hideLoading, getAllWorkouts } from './allWorkoutsSlice';

export const getAllWorkoutsThunk = async (_, thunkAPI) => {
  const {
    searchMesoId,
    searchSessionName,
    searchMicrocycle,
    searchSession,
    searchStatus,
    searchMuscle,
    sort,
    page,
  } = thunkAPI.getState().allWorkouts;

  let url = `/workouts?status=${searchStatus}&muscle=${searchMuscle}&sort=${sort}&page=${page}`;
  if (searchMesoId) {
    url = url + `&mesoId=${searchMesoId}`;
  }
  if (searchMicrocycle) {
    url = url + `&microcycle=${searchMicrocycle}`;
  }
  if (searchSession) {
    url = url + `&session=${searchSession}`;
  }

  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
    // return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteWorkoutThunk = async (url, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(getAllWorkouts());
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
    // return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getCurrentWorkoutThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/workouts/currentWorkout');
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
