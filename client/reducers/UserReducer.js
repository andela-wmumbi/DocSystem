import * as types from './../actions/ActionTypes';
import initialState from './InitialState';
import {NotificationContainer, NotificationManager} from 'react-notifications';

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
        NotificationManager.success('Success message', 'Title here'),
        ...state,
        Object.assign({}, action.credentials)
      ];
    case types.DELETE_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.user)];
    case types.LOG_OUT:
      return !!sessionStorage.token;
    case types.LOAD_USERS_SUCCESS:
      return action.users;
    default:
      return state;
  }
}
