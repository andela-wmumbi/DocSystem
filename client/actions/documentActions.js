/* Actions are object payloads that are identified by a required property 'type'
Action creators are methods that wrap and return the action object*/
import {
  getAllDocuments,
  documentCreate, getDocumentUpdate,
  getDocumentDelete, getUserDocs, getADocument
} from './../apis/DocumentApi';
import * as types from './ActionTypes';

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

export function createDocument(document) {
  return (dispatch) => {
    return documentCreate(document).then((response) => {
      // sessionStorage.setItem('jwt', response.jwt);
      dispatch(createDocumentSuccess(response.body));
    }).catch((error) => {
      throw (error);
    });
  };
}
export function loadDocuments() {
  return (dispatch) => {
    return getAllDocuments()
      .then((res) => {
        dispatch(loadsDocumentsSuccess(res.body));
      })
      .catch((error) => {
        throw (error);
      });
  };
}
export function updateDocument(document) {
  return (dispatch) => {
    return getDocumentUpdate(document)
      .then((res) => {
        dispatch(updateDocumentsSuccess(res.body));
      })
      .catch((error) => {
        throw (error);
      });
  };
}
export function deleteDocument(id, token) {
  return (dispatch) => {
    return getDocumentDelete(id, token)
      .then((res) => {
        dispatch(deleteDocumentSuccess(res.body));
      })
      .catch((error) => {
        throw (error);
      });
  };
}
export function getUserDocuments(id) {
  return (dispatch) => {
    return getUserDocs(id)
      .then((documents) => {
        dispatch(getUserDocsSuccess(documents.data));
      })
      .catch((error) => {
        throw (error);
      });
  };
}
export function searchDocument(title) {
  return (dispatch) => {
    return getADocument(title)
      .then((res) => {
        dispatch(loadsADocumentSuccess(res.body));
      })
      .catch((error) => {
        throw (error);
      });
  };
}
