import { combineReducers } from 'redux';
import documents from './documentReducer';
import users from './userReducer';
import loginReducer from './loginReducer';
import userdocuments from './userDocumentReducer';
import searchdocument from './searchDocument';
import pageDocuments from './documentPaginate';
import pageUsers from './userPaginate';
import roles from './roleReducer';
import roleDocuments from './../actions/documentActions';

export default combineReducers({
  documents,
  users,
  loginReducer,
  userdocuments,
  searchdocument,
  pageDocuments,
  pageUsers,
  roles,
  roleDocuments
});
