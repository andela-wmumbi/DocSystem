import * as types from './ActionTypes';
import UserDetails from './UserDetails';
import { login } from './../apis/UserApi';

export function setLoginPending(isLoginPending) {
  return {
    type: types.SET_LOGIN_PENDING,
    isLoginPending
  };
}

export function setLoginSuccess(isLoginSuccess) {
  return {
    type: types.SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

export function setLoginError(loginError) {
  return {
    type: types.SET_LOGIN_ERROR,
    loginError
  };
}
export function logInUser(credentials) {
  return (dispatch) => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    return login(credentials).then((response) => {
      UserDetails.setToken(response.data.token);
      dispatch(setLoginPending(false));
      dispatch(setLoginSuccess(true));
    }).catch((error) => {
      dispatch(setLoginError(error));
      throw (error);
    });
  };
}
