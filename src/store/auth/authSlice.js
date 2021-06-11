import { createSelector, createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../actions';

//Reducer ******************************************************************************************************
const authSlice = createSlice({
  name: 'currentUser',
  initialState: {
    currentUser: {},
    status: {},
  },
  reducers: {
    userRegistered: (state, action) => {
      state.status = { success: 'Registered!' };
      state.currentUser = {
        id: action.payload.user.id,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    },
    userLogged: (state, action) => {
      state.status = { success: 'Logged in' };
      state.currentUser = {
        id: action.payload.user.id,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    },

    userLoggedOut: (state, action) => {
      state.currentUser = [];
      state.status = {};
    },
    userRegisterFailed: (state, action) => {
      state.status = action.payload;
    },
    userLogginFailed: (state, action) => {
      state.status = action.payload;
    },
    userAuthStatusRemoved: (state, action) => {
      state.status = {};
    },
  },
});

export default authSlice.reducer;
const {
  userLogged,
  userLoggedOut,
  userRegisterFailed,
  userLogginFailed,
  userRegistered,
  userAuthStatusRemoved,
} = authSlice.actions;

//Actions ******************************************************************************************************
export const logUser = (user) => async (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: 'login',
      method: 'POST',
      data: user,
      onSuccess: userLogged.type,
      onError: userLogginFailed.type,
    })
  );
};

export const logoutUser = () => (dispatch) =>
  dispatch({ type: userLoggedOut.type });

export const registerUser = (user) => async (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: 'register',
      method: 'POST',
      data: user,
      onSuccess: userRegistered.type,
      onError: userRegisterFailed.type,
    })
  );
};

export const removeUserAuthStatus = () => (dispatch) => {
  dispatch({ type: userAuthStatusRemoved.type });
};

//Selectors ******************************************************************************************************

export const selectCurrentUser = (state) =>
  createSelector(
    (state) => state.auth.currentUser, //input
    (auth) => auth //output
  );
