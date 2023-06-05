import customFetch from '../../utils/axios';
import { logoutUser } from './userSlice';
// import { authHeader } from '../../utils/authHeader';

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
    const response = await customFetch.patch(
      url,
      user /* , authHeader(thunkAPI) */
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(
        'User token does not match! Logging out...'
      );
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserDataThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.patch(
      url,
      user /* , authHeader(thunkAPI) */
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(
        'User token does not match! Logging out...'
      );
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};