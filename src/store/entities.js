import { combineReducers } from 'redux';
import todosReducer from './todos/todosSlice';

export default combineReducers({
  todos: todosReducer,
});
