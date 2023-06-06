import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {
  registerUserThunk,
  loginUserThunk,
  updateUserDetailsThunk,
  updateUserDataThunk,
  clearAllStoresThunk,
} from './userThunk';
import { createMeso, editMeso } from '../createMeso/createMesoSlice';
import { deleteWorkout } from '../allWorkouts/allWorkoutsSlice';
import { deleteMeso } from '../allMesocycles/allMesocyclesSlice';

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/user/register', user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('/user/login', user, thunkAPI);
  }
);

export const updateUserDetails = createAsyncThunk(
  'user/updateUserDetails',
  async (user, thunkAPI) => {
    return updateUserDetailsThunk('/user/updateUserDetails', user, thunkAPI);
  }
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (user, thunkAPI) => {
    return updateUserDataThunk('/user/updateUserData', user, thunkAPI);
  }
);

export const clearStore = createAsyncThunk(
  'user/clearStore',
  clearAllStoresThunk
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      toast.success(payload);
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      // register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome, ${user.name}!`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome back, ${user.name}!`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // update user details
      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserDetails.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success('Updated user details');
      })
      .addCase(updateUserDetails.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // update user data
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success('Updated user data');
      })
      .addCase(updateUserData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // update user when creating mesocycle)
      .addCase(createMeso.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.user = user;
        addUserToLocalStorage(user);
      })
      .addCase(deleteWorkout.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.user = user;
        addUserToLocalStorage(user);
      })
      .addCase(editMeso.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.user = user;
        addUserToLocalStorage(user);
      })
      .addCase(deleteMeso.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.user = user;
        addUserToLocalStorage(user);
      })
      .addCase(clearStore.rejected, () => {
        toast.error('There was an error');
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
