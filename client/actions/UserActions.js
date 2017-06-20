import * as types from './actionTypes';
import UserApi from './../apis/UserApi';

export function registerSuccess() {
  return { type: types.CREATE_USER_SUCCESS };
}

export function registerUser(user) {
  return function (dispatch) {
    return UserApi.register(user).then((response) => {
      sessionStorage.setItem('jwt', response.jwt);
      dispatch(registerSuccess());
    }).catch((error) => {
      throw (error);
    });
  };
}
