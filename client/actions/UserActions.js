import toastr from 'toastr';
import * as types from './actionTypes';
import { register, getAllUsers, getAUser,
  getUserDelete, getUserUpdate, getUsersPagination }
  from '../apis/UserApi';

export function registerSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}
export function loadsUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users };
}
export function loadsUserSuccess(userdocuments) {
  return { type: types.LOAD_USER_SUCCESS, userdocuments };
}
export function deleteUserSuccess(user) {
  return { type: types.DELETE_USER_SUCCESS, user };
}
export function loadsUserFailure(isSearchError) {
  return { type: types.GET_A_USER_FAILURE, isSearchError };
}
export function updateUserSuccess(user) {
  return { type: types.UPDATE_USER_SUCCESS, user };
}
export function loadsUsersPagination(pageUsers) {
  return { type: types.LOAD_PAGEUSERS_SUCCESS, pageUsers };
}
export function ajaxCallError(error) {
  return { type: types.AJAX_CALL_ERROR, error };
}

export function registerUser(user) {
  return dispatch => register(user).then(() => {
    dispatch(registerSuccess(user));
  }).catch((error) => {
    toastr.error(error.response.data.errors[0].message),
    dispatch(ajaxCallError(error));
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
        dispatch(ajaxCallError(error));
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
        dispatch(loadsUserFailure(error));
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
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}
export function updateUser(userDetails) {
  return (dispatch) => getUserUpdate(userDetails)
    .then((res) => {
      dispatch(updateUserSuccess(res.body));
    })
    .catch((error) => {
      throw (error);
    });
}
export function paginateUsers(limit = 4, offset = 0) {
  return (dispatch) => getUsersPagination(limit, offset)
    .then((res) => {
      dispatch(loadsUsersPagination(res.body));
    })
    .catch((error) => {
      throw (error);
    });
}
