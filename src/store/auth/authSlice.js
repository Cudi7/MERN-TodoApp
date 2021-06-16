import { createSelector, createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions';

//Reducer ******************************************************************************************************
const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    status: {},
  },
  reducers: {
    registered: (state, action) => {
      state.status = { success: 'Registered!' };
      state.user = {
        id: action.payload.user.id,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    },
    logged: (state, action) => {
      state.status = { success: 'Logged in' };
      state.user = {
        id: action.payload.user.id,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    },

    loggedOut: (state, action) => {
      state.user = [];
      state.status = {};
    },
    registerFailed: (state, action) => {
      state.status = action.payload;
    },
    logginFailed: (state, action) => {
      state.status = action.payload;
    },
    statusMessageCleared: (state, action) => {
      state.status = {};
    },
  },
});

export default authSlice.reducer;
const {
  logged,
  loggedOut,
  registerFailed,
  logginFailed,
  registered,
  statusMessageCleared,
} = authSlice.actions;

//Actions ******************************************************************************************************
export const logUser = (user) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: 'login',
      method: 'POST',
      data: user,
      onSuccess: logged.type,
      onError: logginFailed.type,
    })
  );
};

export const logoutUser = () => (dispatch) =>
  dispatch({ type: loggedOut.type });

export const clearStatusMessage = () => (dispatch) =>
  dispatch({ type: statusMessageCleared.type });

export const registerUser = (user) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: 'register',
      method: 'POST',
      data: user,
      onSuccess: registered.type,
      onError: registerFailed.type,
    })
  );
};

//Selectors ******************************************************************************************************

export const selectCurrentUser = (state) =>
  createSelector(
    (state) => state.auth.currentUser, //input
    (auth) => auth //output
  );
