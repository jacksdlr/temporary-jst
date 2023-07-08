import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getWorkoutThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateWorkoutThunk = async (url, workout, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, workout);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
