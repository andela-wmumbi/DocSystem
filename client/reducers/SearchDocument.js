import * as types from './../actions/actionTypes';

export default function SearchDocument(
  state = {
    searchdocument: [],
    isSearchError: null },
  action
    ) {
  switch (action.type) {
    case types.GET_A_DOCUMENT_SUCCESS:
      return action.document;
    case types.GET_A_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        isSearchError: action.isSearchError
      });
    default:
      return state;
  }
}
