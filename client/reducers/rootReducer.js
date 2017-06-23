import { combineReducers } from 'redux';
import documents from './DocumentReducer';
import users from './UserReducer';
import loginReducer from './LoginReducer';

export default combineReducers({
  documents,
  users,
  loginReducer,
});
