import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getNextWorkoutThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/workouts/nextWorkout');
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getWorkoutThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
