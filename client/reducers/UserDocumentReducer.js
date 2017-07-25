import * as types from './../actions/actionTypes';

export default function UserReducer(
  state = {
    userdocuments: [],
    isSearchError: null
  }, action) {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
      return action.userdocuments;
    case types.GET_A_USER_FAILURE:
      return Object.assign({}, state, {
        isSearchError: action.isSearchError
      });
    default:
      return state;
  }
}
