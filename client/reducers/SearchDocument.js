import * as types from './../actions/ActionTypes';
import initialState from './InitialState';

export default function SearchDocument(state = initialState.searchdocument, action) {
  switch (action.type) {
    case types.GET_A_DOCUMENT_SUCCESS:
      return action.document;
    default:
      return state;
  }
}
