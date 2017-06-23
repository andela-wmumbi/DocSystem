import * as types from './../actions/ActionTypes';
import initialState from './InitialState';

export default function documentReducer(state = initialState.documents, action) {
  switch (action.type) {
    // checkc if action dispatched is
    // CREATE_DOCUMENT and act on  that
    case types.CREATE_DOCUMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.document)];

    case types.LOAD_DOCUMENTS_SUCCESS:
      /* updating the state without mutating it
      create another array of data and
      update it's content with the previous state and that changes made
      The spread operator just pours out the content on the array into the new array*/
      return action.documents;
    default:
      return state;
  }
}
