import { configureStore } from '@reduxjs/toolkit';
import navbarSlice from './features/navbar/navbarSlice';
import userSlice from './features/user/userSlice';
import createMesoSlice from './features/createMeso/createMesoSlice';
import allWorkoutsSlice from './features/allWorkouts/allWorkoutsSlice';
import allMesocyclesSlice from './features/allMesocycles/allMesocyclesSlice';
import workoutSlice from './features/workout/workoutSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    createMeso: createMesoSlice,
    allWorkouts: allWorkoutsSlice,
    workout: workoutSlice,
    allMesocycles: allMesocyclesSlice,
    navbar: navbarSlice,
  },
});
