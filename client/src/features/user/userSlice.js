import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  addWorkoutToLocalStorage,
  getWorkoutFromLocalStorage,
  removeWorkoutFromLocalStorage,
} from '../../utils/localStorage';
import {
  registerUserThunk,
  loginUserThunk,
  updateUserDetailsThunk,
  updateUserDataThunk,
  syncUserDataThunk,
  clearAllStoresThunk,
} from './userThunk';
import { createMeso, editMeso } from '../create-meso/createMesoSlice';
import { deleteWorkout } from '../all-workouts/allWorkoutsSlice';
import { deleteMeso } from '../mesocycles/mesocyclesSlice';
import { updateWorkout } from '../workout/workoutSlice';

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  nextWorkout: getWorkoutFromLocalStorage(),
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

export const syncUserData = createAsyncThunk(
  'user/syncUserData',
  async (updatedAt, thunkAPI) => {
    return syncUserDataThunk(`/user?updatedAt=${updatedAt}`, thunkAPI);
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
      state.nextWorkout = null;
      toast.success(payload);
      removeUserFromLocalStorage();
      removeWorkoutFromLocalStorage();
    },
    handleDataChange: (state, { payload: { input, value } }) => {
      state.user.data[input] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      // register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload: { user } }) => {
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
      .addCase(loginUser.fulfilled, (state, { payload: { user, workout } }) => {
        state.isLoading = false;
        state.user = user;
        if (workout) {
          state.nextWorkout = workout;
          addWorkoutToLocalStorage(workout);
        } else {
          state.nextWorkout = null;
          removeWorkoutFromLocalStorage();
        }
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
      .addCase(updateUserDetails.fulfilled, (state, { payload: { user } }) => {
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
      .addCase(updateUserData.fulfilled, (state, { payload: { user } }) => {
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success('Updated user data');
      })
      .addCase(updateUserData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(
        createMeso.fulfilled,
        (state, { payload: { user, workout } }) => {
          state.user = user;
          addUserToLocalStorage(user);
          if (workout) {
            state.nextWorkout = workout;
            addWorkoutToLocalStorage(workout);
          } else {
            state.nextWorkout = null;
            removeWorkoutFromLocalStorage();
          }
        }
      )
      .addCase(
        deleteWorkout.fulfilled,
        (state, { payload: { user, workout } }) => {
          state.user = user;
          addUserToLocalStorage(user);
          if (workout) {
            state.nextWorkout = workout;
            addWorkoutToLocalStorage(workout);
          } else {
            state.nextWorkout = null;
            removeWorkoutFromLocalStorage();
          }
        }
      )
      .addCase(editMeso.fulfilled, (state, { payload: { user, workout } }) => {
        state.user = user;
        addUserToLocalStorage(user);
        if (workout) {
          state.nextWorkout = workout;
          addWorkoutToLocalStorage(workout);
        } else {
          state.nextWorkout = null;
          removeWorkoutFromLocalStorage();
        }
      })
      .addCase(
        deleteMeso.fulfilled,
        (state, { payload: { user, workout } }) => {
          state.user = user;
          addUserToLocalStorage(user);
          if (workout) {
            state.nextWorkout = workout;
            addWorkoutToLocalStorage(workout);
          } else {
            state.nextWorkout = null;
            removeWorkoutFromLocalStorage();
          }
        }
      )
      .addCase(clearStore.rejected, () => {
        toast.error('There was an error');
      })
      .addCase(
        updateWorkout.fulfilled,
        (state, { payload: { user, workout } }) => {
          state.user = user;
          addUserToLocalStorage(user);
          if (workout) {
            state.nextWorkout = workout;
            addWorkoutToLocalStorage(workout);
          } else {
            state.nextWorkout = null;
            removeWorkoutFromLocalStorage();
          }
        }
      )
      .addCase(
        syncUserData.fulfilled,
        (state, { payload: { user, msg, workout } }) => {
          if (msg == 'Synced user data!') {
            state.user = user;
            addUserToLocalStorage(user);
            if (workout) {
              state.nextWorkout = workout;
              addWorkoutToLocalStorage(workout);
            } else {
              state.nextWorkout = null;
              removeWorkoutFromLocalStorage();
            }
            toast.success(msg);
          }
        }
      )
      .addCase(syncUserData.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});

export const { logoutUser, handleDataChange } = userSlice.actions;
export default userSlice.reducer;
