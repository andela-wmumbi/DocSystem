import * as types from './../actions/ActionTypes';
import initialState from './InitialState';

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
    case types.LOG_OUT:
      return !!sessionStorage.token;
    default:
      return state;
  }
}
