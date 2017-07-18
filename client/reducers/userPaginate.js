import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function userPaginate(state = initialState.pageUsers, action) {
  switch (action.type) {
    case types.LOAD_PAGEUSERS_SUCCESS:
      return action.pageUsers;
    default:
      return state;
  }
}
