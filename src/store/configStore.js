import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import entities from './entities';
import auth from './auth';
import ui from './ui';
import apiMiddleware from '../middleware/apiMiddleware';

const reducer = combineReducers({
  entities,
  auth,
  ui,
});

const preloadedState = {
  entities: {
    todos: window.localStorage.getItem('todos')
      ? {
          list: JSON.parse(window.localStorage.getItem('todos')),
          publicTodos: [],
        }
      : { list: [], publicTodos: [] },
  },
};

export default configureStore({
  reducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
