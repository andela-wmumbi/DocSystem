import { combineReducers } from 'redux';
import documents from './documentReducer';
import users from './UserReducer';
import loginReducer from './loginReducer';
import userdocuments from './UserDocumentReducer';
import searchdocument from './SearchDocument';
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
