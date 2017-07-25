import toastr from 'toastr';
import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR } from './actionTypes';
import userDetails from './userDetails';
import { login } from './../apis/UserApi';

export function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

export function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

export function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  };
}
export function logInUser(credentials) {
  return (dispatch) => {
    dispatch(setLoginError(null));
    return login(credentials).then((response) => {
      userDetails.setToken(response.data.token);
      dispatch(setLoginSuccess(true));
    }).catch((error) => {
      toastr.error(error.response.data.message);
      dispatch(setLoginError(error));
      throw (error);
    });
  };
}
