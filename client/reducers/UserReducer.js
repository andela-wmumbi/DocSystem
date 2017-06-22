import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function UserReducer(state = initialState.users, action) {
  switch (action.type) {
    // checkc if action dispatched is
    // CREATE_DOCUMENT and act on  that
    case types.CREATE_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.user)
      ];
    case types.LOG_IN_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.credentials)
      ];
    default:
      return state;
  }
}
