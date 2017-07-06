/* Actions are object payloads that are identified by a required property 'type'
Action creators are methods that wrap and return the action object*/
import {
  getAllDocuments,
  documentCreate, getDocumentUpdate,
  getDocumentDelete, getUserDocs, getADocument, getPagination
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
export function loadsADocumentFailure(isSearchError) {
  return { type: types.GET_A_DOCUMENT_FAILURE, isSearchError };
}
export function loadsPagination(pageDocuments) {
  return { type: types.LOAD_PAGEDOCUMENTS_SUCCESS, pageDocuments };
}
export function setDeleteSuccess(isDeleteSuccess) {
  return { type: types.SET_DELETE_SUCCESS, isDeleteSuccess };
}
export function setDeleteError(deleteError) {
  return { type: types.SET_DELETE_ERROR, deleteError };
}

export function createDocument(document) {
  return dispatch => documentCreate(document).then((response) => {
    dispatch(createDocumentSuccess(response.body));
  }).catch((error) => {
    throw (error);
  });
}
export function loadDocuments() {
  return dispatch => getAllDocuments()
    .then((res) => {
      dispatch(loadsDocumentsSuccess(res.body));
    })
    .catch((error) => {
      throw (error);
    });
}
export function paginateDocuments(limit = 4, offset = 1) {
  return dispatch => getPagination(limit, offset)
    .then((res) => {
      dispatch(loadsPagination(res.body));
    })
    .catch((error) => {
      throw (error);
    });
}
export function updateDocument(document) {
  return dispatch => getDocumentUpdate(document)
    .then((res) => {
      dispatch(updateDocumentsSuccess(res.body));
    })
    .catch((error) => {
      throw (error);
    });
}
export function deleteDocument(id, token) {
  return (dispatch) => {
    dispatch(setDeleteSuccess(false));
    return getDocumentDelete(id, token)
    .then((res) => {
      dispatch(deleteDocumentSuccess(res.body.message));
      // dispatch(setDeleteSuccess(true));
    })
    .catch((error) => {
      dispatch(setDeleteError(error));
      throw (error);
    });
  };
}
export function getUserDocuments(id) {
  return dispatch => getUserDocs(id)
    .then((documents) => {
      dispatch(getUserDocsSuccess(documents.data));
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

