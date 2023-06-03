import customFetch from '../../utils/axios';
import {
  showLoading,
  hideLoading,
  getCurrentWorkout,
} from './currentWorkoutSlice';

export const getCurrentWorkoutThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/workouts/currentWorkout'); // go to backend
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
