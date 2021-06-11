import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import entities from './entities';
import auth from './auth';
import apiMiddleware from '../middleware/apiMiddleware';

const reducer = combineReducers({
  entities,
  auth,
});

const preloadedState = {
  entities: {
    todos: window.localStorage.getItem('todos')
      ? JSON.parse(window.localStorage.getItem('todos'))
      : [],
  },
};

export default configureStore({
  reducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
