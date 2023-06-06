import customFetch from '../../utils/axios';
import {
  showLoading,
  hideLoading,
  getAllMesocycles,
} from './allMesocyclesSlice';
// import { authHeader } from '../../utils/authHeader';

export const getAllMesocyclesThunk = async (_, thunkAPI) => {
  const { search, searchStatus, searchGoal, searchMicrocycles, sort, page } =
    thunkAPI.getState().allMesocycles;

  let url = `/mesocycles?status=${searchStatus}&goal=${searchGoal}&sort=${sort}&page=${page}`;

  if (search) {
    url = url + `&mesoName=${search}`;
  }
  if (searchMicrocycles) {
    url = url + `&microcycles=${searchMicrocycles}`;
  }

  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteMesoThunk = async (url, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(getAllMesocycles());
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
