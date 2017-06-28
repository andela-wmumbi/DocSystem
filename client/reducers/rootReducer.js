import { combineReducers } from 'redux';
import documents from './DocumentReducer';
import users from './UserReducer';
import loginReducer from './LoginReducer';
import userdocuments from './UserDocumentReducer';
import searchdocument from './SearchDocument';

export default combineReducers({
  documents,
  users,
  loginReducer,
  userdocuments,
  searchdocument,
});
