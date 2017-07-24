import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function documentReducer(state = initialState.pageDocuments, action) {
  switch (action.type) {
    case types.LOAD_PAGEDOCUMENTS_SUCCESS:
      return action.pageDocuments;
    default:
      return state;
  }
}
