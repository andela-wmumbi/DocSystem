import { combineReducers } from 'redux';
import documents from './documentReducer';
import users from './UserReducer';

export default combineReducers({
  documents,
  users
});
