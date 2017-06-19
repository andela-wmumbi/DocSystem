
import * as types from './actionTypes';
import loginApi from './../Apis/LoginApi';

export function loginSuccess() {
  return { type: types.LOG_IN_SUCCESS };
}

export function logInUser(credentials) {
  return function (dispatch) {
    return loginApi.login(credentials).then((response) => {
      sessionStorage.setItem('jwt', response.jwt);
      dispatch(loginSuccess());
    }).catch((error) => {
      throw (error);
    });
  };
}
