/* Actions are object payloads that are identified by a required property 'type'
Action creators are methods that wrap and return the action object*/
import toastr from 'toastr';
import {
  getAllDocuments,
  documentCreate, getDocumentUpdate,
  getDocumentDelete, getUserDocs, getADocument, getPagination, getRoleDocuments
} from './../apis/DocumentApi';
import * as types from './actionTypes';

export function loadsDocumentsSuccess(documents) {
  return { type: types.LOAD_DOCUMENTS_SUCCESS, documents };
}
export function createDocumentSuccess(document) {
  return { type: types.CREATE_DOCUMENT_SUCCESS, document };
}
export function updateDocumentsSuccess(document) {
  return { type: types.UPDATE_DOCUMENT_SUCCESS, document };
}
export function deleteDocumentSuccess(id) {
  return { type: types.DELETE_DOCUMENT_SUCCESS, id };
}
export function getUserDocsSuccess(documents) {
  return { type: types.GET_USER_DOCUMENTS, documents };
}
export function loadsADocumentSuccess(document) {
  return { type: types.GET_A_DOCUMENT_SUCCESS, document };
}
export function loadsRoleDocuments(documents) {
  return { type: types.GET_ROLE_DOCUMENTS, documents };
}
export function loadsADocumentFailure(isSearchError) {
  return { type: types.GET_A_DOCUMENT_FAILURE, isSearchError };
}
export function loadsPagination(pageDocuments) {
  return { type: types.LOAD_PAGEDOCUMENTS_SUCCESS, pageDocuments };
}
export function ajaxCallError(error) {
  return { type: types.AJAX_CALL_ERROR, error };
}

export function createDocument(document) {
  return dispatch => documentCreate(document)
    .then((response) => {
      dispatch(createDocumentSuccess(response.body));
    })
    .catch((error) => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
}
export function loadDocuments() {
  return dispatch => getAllDocuments()
    .then((res) => {
      dispatch(loadsDocumentsSuccess(res.body));
    })
    .catch((error) => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
}
export function loadRoleDocuments(role) {
  return dispatch => getRoleDocuments(role)
    .then((res) => {
      dispatch(loadsRoleDocuments(res.body));
    }).catch((error) => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
}
export function updateDocument(document) {
  return dispatch => getDocumentUpdate(document)
    .then((res) => {
      // toastr.success(res.body.message);
      dispatch(updateDocumentsSuccess(res.body.doc));
    })
    .catch((error) => {
      // toastr.error(error.response.data.message);
      dispatch(ajaxCallError(error));
      throw (error);
    });
}
export function deleteDocument(id) {
  return (dispatch) => {
    return getDocumentDelete(id)
      .then((res) => {
        // toastr.success(res.body.message);
        dispatch(deleteDocumentSuccess(id));
      })
      .catch((error) => {
        // toastr.error(error.response.data.message);
        throw (error);
      });
  };
}
export function getUserDocuments(id) {
  return dispatch => getUserDocs(id)
    .then((documents) => {
      dispatch(getUserDocsSuccess(documents.body));
    })
    .catch((error) => {
      throw (error);
    });
}
export function searchDocument(title) {
  return dispatch => getADocument(title)
    .then((res) => {
      dispatch(loadsADocumentSuccess(res.body));
    })
    .catch((error) => {
      dispatch(loadsADocumentFailure(error));
      throw (error);
    });
}
export function paginateDocuments(limit = 4, offset = 0) {
  return dispatch => getPagination(limit, offset)
    .then((res) => {
      dispatch(loadsPagination(res.body));
    })
    .catch((error) => {
      throw (error);
    });
}

