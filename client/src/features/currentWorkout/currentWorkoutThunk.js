import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getCurrentWorkoutThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/workouts/currentWorkout');
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
