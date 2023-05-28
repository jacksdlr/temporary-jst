import { configureStore } from '@reduxjs/toolkit';
import navbarSlice from './features/navbar/navbarSlice';
import userSlice from './features/user/userSlice';
import mesoSlice from './features/mesocycle/mesoSlice';
import allWorkoutsSlice from './features/allWorkouts/allWorkoutsSlice';
import allMesocyclesSlice from './features/allMesocycles/allMesocyclesSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    meso: mesoSlice,
    allWorkouts: allWorkoutsSlice,
    allMesocycles: allMesocyclesSlice,
    navbar: navbarSlice,
  },
});
