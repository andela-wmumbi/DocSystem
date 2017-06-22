import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function documentReducer(state = initialState.documents, action) {
  switch (action.type) {
    // checkc if action dispatched is
    // CREATE_DOCUMENT and act on  that
    case types.CREATE_DOCUMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.document)
      ];

    case types.LOAD_DOCUMENT_SUCCESS:
      /* updating the state without mutating it
      create another array of data and
      update it's content with the previous state and that changes made
      The spread operator just pours out the content on the array into the new array*/
      return [
        ...state,
        Object.assign({}, action.documents)
      ];
    default:
      return state;
  }
}
