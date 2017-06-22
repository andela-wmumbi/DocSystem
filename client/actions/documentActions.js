/* Actions are object payloads that are identified by a required property 'type'
Action creators are methods that wrap and return the action object*/
import { getAllDocuments, documentCreate } from './../apis/DocumentApi';
import * as types from './actionTypes';

export function loadsDocumentsSuccess(documents) {
  return { type: types.LOAD_DOCUMENT_SUCCESS, documents };
}
export function createDocumentSuccess() {
  return { type: types.CREATE_DOCUMENT_SUCCESS };
}

export function createDocument(document) {
  return (dispatch) => {
    return documentCreate(document).then((response) => {
      // sessionStorage.setItem('jwt', response.jwt);
      dispatch(createDocumentSuccess(document));
      console.log(response)
    }).catch((error) => {
      throw (error);
    });
  };
}
export function loadDocuments() {
  return function (dispatch) {
    return getAllDocuments()
      .then((documents) => {
        dispatch(loadsDocumentsSuccess(documents));
      })
      .catch((error) => {
        throw (error);
      });
  };
}
