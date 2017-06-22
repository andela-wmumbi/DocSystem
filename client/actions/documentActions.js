/* Actions are object payloads that are identified by a required property 'type'
Action creators are methods that wrap and return the action object*/
import { getAllDocuments, documentCreate } from './../apis/DocumentApi';
import * as types from './actionTypes';

export function loadsDocumentsSuccess(documents) {
  return { type: types.LOAD_DOCUMENTS_SUCCESS, documents };
}
export function createDocumentSuccess(document) {
  return { type: types.CREATE_DOCUMENT_SUCCESS, document };
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
