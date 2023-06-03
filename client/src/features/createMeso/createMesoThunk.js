import customFetch from '../../utils/axios';
import { clearInputs } from './createMesoSlice';
// import { authHeader } from '../../utils/authHeader';

export const createMesoThunk = async (url, mesocycle, thunkAPI) => {
  try {
    const response = await customFetch.post(
      url,
      mesocycle /* ,
      authHeader(thunkAPI) */
    );
    thunkAPI.dispatch(clearInputs());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);

    // return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editMesoThunk = async (url, mesocycle, thunkAPI) => {
  try {
    const response = await customFetch.patch(
      url,
      mesocycle /* ,
      authHeader(thunkAPI) */
    );
    thunkAPI.dispatch(clearInputs());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
