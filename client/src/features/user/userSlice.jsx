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
} from './userThunk';
import { createMeso } from '../mesocycle/mesoSlice';

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('/auth/login', user, thunkAPI);
  }
);

export const updateUserDetails = createAsyncThunk(
  'user/updateUserDetails',
  async (user, thunkAPI) => {
    return updateUserDetailsThunk('/auth/updateUserDetails', user, thunkAPI);
  }
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (user, thunkAPI) => {
    return updateUserDataThunk('/auth/updateUserData', user, thunkAPI);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      toast.success('Logout successful');
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
      });
  },
});

export const { logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
