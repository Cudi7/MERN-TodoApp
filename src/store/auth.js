import { combineReducers } from 'redux';
import authReducer from './auth/authSlice';

export default combineReducers({
  currentUser: authReducer,
});
