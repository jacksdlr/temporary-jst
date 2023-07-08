import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { logoutUser } from './userSlice';
import { clearAllWorkoutsState } from '../all-workouts/allWorkoutsSlice';
import { clearMesocyclesState } from '../mesocycles/mesocyclesSlice';
import { clearCreateMesoState } from '../create-meso/createMesoSlice';
import { clearWorkoutState } from '../workout/workoutSlice';

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserDetailsThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, user);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateUserDataThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, user);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const syncUserDataThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearAllStoresThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearMesocyclesState);
    thunkAPI.dispatch(clearAllWorkoutsState);
    thunkAPI.dispatch(clearCreateMesoState);
    thunkAPI.dispatch(clearWorkoutState);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
