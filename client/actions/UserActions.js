import * as types from './actionTypes';
import { register, login } from '../apis/UserApi';
import UserDetails from './UserDetails';

export function registerSuccess() {
  return { type: types.CREATE_USER_SUCCESS, };
}

export function loginSuccess() {
  return { type: types.LOG_IN_SUCCESS };
}

export function registerUser(user) {
  return function (dispatch) {
    return register(user).then((response) => {
      dispatch(registerSuccess(user));
    }).catch((error) => {
      throw (error);
    });
  };
}
export function logInUser(credentials) {
  return function (dispatch) {
    return login(credentials).then((response) => {
      sessionStorage.setItem('token', response.data.token);
      dispatch(loginSuccess(credentials));
    }).catch((error) => {
      throw (error);
    });
  };
}

