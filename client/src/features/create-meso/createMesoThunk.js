import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearCreateMesoState } from './createMesoSlice';

export const createMesoThunk = async (url, mesocycle, thunkAPI) => {
  try {
    const response = await customFetch.post(url, mesocycle);
    thunkAPI.dispatch(clearCreateMesoState());
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editMesoThunk = async (url, mesocycle, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, mesocycle);
    thunkAPI.dispatch(clearCreateMesoState());
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
