import { configureStore } from '@reduxjs/toolkit';
import navbarSlice from './features/navbar/navbarSlice';
import userSlice from './features/user/userSlice';
import createMesoSlice from './features/create-meso/createMesoSlice';
import allWorkoutsSlice from './features/all-workouts/allWorkoutsSlice';
import mesocyclesSlice from './features/mesocycles/mesocyclesSlice';
import workoutSlice from './features/workout/workoutSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    createMeso: createMesoSlice,
    allWorkouts: allWorkoutsSlice,
    workout: workoutSlice,
    mesocycles: mesocyclesSlice,
    navbar: navbarSlice,
  },
});
