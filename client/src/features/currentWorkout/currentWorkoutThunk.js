import customFetch from '../../utils/axios';

export const getCurrentWorkoutThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/workouts/currentWorkout');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
