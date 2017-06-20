/* Actions are object payloads that are identified by a required property 'type'
Action creators are methods that wrap and return the action object*/
import Axios from 'axios';
import documentApi from './../apis/document';
import * as types from './actionTypes';

export function loadDocuments() {
  return function (dispatch) {
    return documentApi.getAllDocuments()
      .then((documents) => {
        dispatch(loadsDocumentsSuccess(documents));
      })
      .catch((error) => {
        throw (error);
      });
  };
}
export function loadsDocumentsSuccess(documents) {
  return { type: types.LOAD_DOCUMENT_SUCCESS, documents };
}
export const createDocument = (document) => (dispatch) => {
  return Axios.post(apiUrl, document)
      .then(response => {
        // Dispatch a synchronous action
        // to handle data
        dispatch(createDocumentSuccess(response.data))
      })
      .catch(error => {
        throw (error);
      });
};
export const createDocumentSuccess = (document) => {
  return {
    type: 'CREATE_DOCUMENT_SUCCESS',
    document
  };
};
