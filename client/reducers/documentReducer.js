import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function documentReducer(state = initialState.documents, action) {
  /* updating the state without mutating it
  create another array of data and
  update it's content with the previous state and that changes made
  The spread operator just pours out the content on the array into the new array*/
  switch (action.type) {
    // checkc if action dispatched is
    // CREATE_DOCUMENT and act on  that
    case types.CREATE_DOCUMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.document)];
    case types.UPDATE_DOCUMENT_SUCCESS:
      return state.map((document) => {
        if (document.id === action.document.id) {
          return action.document;
        }
        return document;
      });
    case types.DELETE_DOCUMENT_SUCCESS:
      return [...state].filter((document) => {
        if (document.id !== action.document.id) {
          return document;
        }
      });
    case types.LOAD_DOCUMENTS_SUCCESS:
      return action.documents;
    case types.GET_USER_DOCUMENTS:
      return action.documents;
    case types.GET_ROLE_DOCUMENTS:
      return action.documents;
    default:
      return state;
  }
}
