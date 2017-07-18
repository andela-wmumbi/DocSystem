import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function roleReducer(state = initialState.roles, action) {
  switch (action.type) {
    case types.CREATE_ROLE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.role)];
    case types.LOAD_ROLES_SUCCESS:
      return action.roles;
    default:
      return state;
  }
}
