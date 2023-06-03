import customFetch from '../../utils/axios';
import {
  showLoading,
  hideLoading,
  getAllMesocycles,
} from './allMesocyclesSlice';
// import { authHeader } from '../../utils/authHeader';

export const getAllMesocyclesThunk = async (_, thunkAPI) => {
  const { searchStatus, mesoName } = thunkAPI.getState().allMesocycles;

  let url = `/mesocycles?status=${searchStatus}`;

  if (mesoName) {
    url = url + `&mesoName=${mesoName}`;
  }

  try {
    const response = await customFetch.get(url /* , authHeader(thunkAPI) */);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteMesoThunk = async (url, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const response = await customFetch.delete(url /* , authHeader(thunkAPI) */);
    thunkAPI.dispatch(getAllMesocycles());
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
