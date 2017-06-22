import * as types from './actionTypes';
import UserDetails from './UserDetails';
import { register, login } from '../apis/UserApi';

export function registerSuccess() {
  return { type: types.CREATE_USER_SUCCESS, };
}

export function loginSuccess() {
  return { type: types.LOG_IN_SUCCESS };
}

export function registerUser(user) {
  return function (dispatch) {
    return register(user).then((response) => {
      // sessionStorage.setItem('jwt', response.jwt);
      dispatch(registerSuccess(user));
      const userId = user.id;
      localStorage.setItem('userId', userId);
    }).catch((error) => {
      throw (error);
    });
  };
}
export function logInUser(credentials) {
  return function (dispatch) {
    return login(credentials).then((response) => {
      // sessionStorage.setItem('jwt', response.jwt);
      dispatch(loginSuccess(credentials));
    }).catch((error) => {
      throw (error);
    });
  };
}

