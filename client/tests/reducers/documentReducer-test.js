import expect from 'expect';
import documentReducer from './../../reducers/documentReducer';
import * as types from './../../actions/actionTypes';

describe('documents reducer', () => {
  describe('create document reducer', () => {
    it('should return initial state', () => {
      expect(documentReducer(undefined, {})).toEqual([]);
    });
    it('should handle create document', () => {
      const initialState = {
        documents: []
      };
      const document = { id: 1 };
      const action = { type: types.CREATE_DOCUMENT_SUCCESS, document };

      const newState = documentReducer(initialState, action);

      expect(newState[0]).toEqual(document);
    });
  });
  describe('update document reducer', () => {
    xit('should handle document update', () => {
      const initialState = {
        documents: []
      };
      const document = { id: 1 };
      const newdoc = { id: 1, title: 'newdoc' };
      const action = { type: types.UPDATE_DOCUMENT_SUCCESS, document };

      const newState = documentReducer(initialState, action);

      expect(newState[0]).toEqual(newdoc);
    });
  });
  describe('delete document reducer', () => {
    it('should handle document delete', () => {
      const initialState = {
        documents: []
      };
      const id = 1;
      const action = { type: types.DELETE_DOCUMENT_SUCCESS, id };

      const newState = documentReducer(initialState, action);

      expect(newState[0]).toEqual();
    });
  });
  describe('load documents reducer', () => {
    xit('should handle load documents', () => {
      const initialState = {
        documents: []
      };
      const document = { id: 1 };
      const action = { type: types.LOAD_DOCUMENTS_SUCCESS, document };

      const newState = documentReducer(initialState, action);

      expect(newState[0]).toEqual(document);
    });
  });
  describe('load user document reducer', () => {
    xit('should handle load user documents', () => {
      const initialState = {
        documents: []
      };
      const document = { id: 1 };
      const action = { type: types.GET_USER_DOCUMENTS, document };

      const newState = documentReducer(initialState, action);

      expect(newState[0]).toEqual(document);
    });
  });
  describe('load role document reducer', () => {
    xit('should handle load role documents', () => {
      const initialState = {
        documents: []
      };
      const document = { id: 1 };
      const action = { type: types.GET_ROLE_DOCUMENTS, document };

      const newState = documentReducer(initialState, action);

      expect(newState[0]).toEqual(document);
    });
  });
});
