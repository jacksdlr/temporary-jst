import { configureStore } from '@reduxjs/toolkit';
import navbarSlice from './features/navbar/navbarSlice';
import userSlice from './features/user/userSlice';
import mesoSlice from './features/mesocycle/mesoSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    meso: mesoSlice,
    navbar: navbarSlice,
  },
});
