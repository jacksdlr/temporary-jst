import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearInputs } from './createMesoSlice';

export const createMesoThunk = async (url, mesocycle, thunkAPI) => {
  try {
    const response = await customFetch.post(url, mesocycle);
    thunkAPI.dispatch(clearInputs());
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editMesoThunk = async (url, mesocycle, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, mesocycle);
    thunkAPI.dispatch(clearInputs());
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
