import { combineReducers } from 'redux';
import uiReducer from './loading/uiSlice';

export default combineReducers({
  progress: uiReducer,
});
