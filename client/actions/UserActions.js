import * as types from './ActionTypes';
import { register, getUserDocs } from '../apis/UserApi';

export function registerSuccess() {
  return { type: types.CREATE_USER_SUCCESS, };
}

export function registerUser(user) {
  return dispatch => register(user).then(() => {
    dispatch(registerSuccess(user));
  }).catch((error) => {
    throw (error);
  });
}
export function logOutUser() {
  sessionStorage.removeItem('token');
  return { type: types.LOG_OUT };
}
