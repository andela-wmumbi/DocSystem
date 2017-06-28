import * as types from './../actions/ActionTypes';
import initialState from './InitialState';

export default function UserReducer(state = initialState.userdocuments, action) {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
      return action.userdocuments;
    default:
      return state;
  }
}
