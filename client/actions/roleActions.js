import * as types from './actionTypes';
import { roleCreate, getAllRoles, getRoleDelete } from './../apis/RoleApi';
import UserDetails from './userDetail';

export function createRoleSuccess(role) {
  return { type: types.CREATE_ROLE_SUCCESS, role };
}
export function loadsRolesSuccess(roles) {
  return { type: types.LOAD_ROLES_SUCCESS, roles };
}
export function deleteRoleSuccess(role) {
  return { type: types.DELETE_ROLE_SUCCESS, role };
}
export function ajaxCallError(error) {
  return { type: types.AJAX_CALL_ERROR, error };
}

export function createRole(role) {
  return dispatch => roleCreate(role)
    .then((response) => {
      dispatch(createRoleSuccess(response.body));
    }).catch((error) => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
}
export function loadRoles() {
  return dispatch => getAllRoles()
    .then((res) => {
      dispatch(loadsRolesSuccess(res.body));
      UserDetails.storeRoles(res.body);
    })
    .catch((error) => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
}
export function deleteRole(id) {
  return dispatch => getRoleDelete(id)
    .then((res) => {
      dispatch(deleteRoleSuccess(res.body));
    })
    .catch((error) => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
}
