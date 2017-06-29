import * as types from './ActionTypes';
import { register, getAllUsers, getAUser, getUserDelete } from '../apis/UserApi';

export function registerSuccess() {
  return { type: types.CREATE_USER_SUCCESS, };
}
export function loadsUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users };
}
export function loadsUserSuccess(userdocuments) {
  return { type: types.LOAD_USER_SUCCESS, userdocuments };
}
export function deleteUserSuccess(id) {
  return { type: types.DELETE_USER_SUCCESS, id };
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
export function loadUsers() {
  return (dispatch) => {
    return getAllUsers()
      .then((res) => {
        dispatch(loadsUsersSuccess(res.body));
      })
      .catch((error) => {
        throw (error);
      });
  };
}
export function searchUser(name) {
  return (dispatch) => {
    return getAUser(name)
      .then((res) => {
        dispatch(loadsUserSuccess(res.body));
      })
      .catch((error) => {
        throw (error);
      });
  };
}
export function deleteUser(id) {
  return (dispatch) => {
    return getUserDelete(id)
      .then((res) => {
        dispatch(deleteUserSuccess(res.body));
      })
      .catch((error) => {
        throw (error);
      });
  };
}
