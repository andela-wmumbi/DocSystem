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
    case types.DELETE_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.user)];
    case types.UPDATE_USER_SUCCESS:
      return state.map((user) => {
        if (user.id === action.user.id) {
          return action.user;
        }
        return user;
      });
    case types.LOG_OUT:
      return !!sessionStorage.token;
    case types.LOAD_USERS_SUCCESS:
      return action.users;

    default:
      return state;
  }
}
