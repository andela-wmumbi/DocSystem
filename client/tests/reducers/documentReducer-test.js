import expect from 'expect';
import documentReducer from './../../reducers/documentReducer';
import * as actions from './../../actions/documentActions';

describe('documents reducer', () => {
  describe('create document reducer', () => {
    it('should return initial state', () => {
      expect(documentReducer(undefined, {})).toEqual([]);
    });
    it('should handle create document', () => {
      const initialState = {
        documents: [
          { title: 'doc' }
        ]
      };
      const document = { title: 'doc2' };
      const action = actions.createDocumentSuccess(document);

      const newState = documentReducer(initialState.documents, action);
      expect(newState.length).toBe(2);
      expect(newState[1].title).toBe('doc2');
    });
  });
  describe('update document reducer', () => {
    it('should handle document update', () => {
      const initialState = [
          { id: 1, title: 'old' }
      ];
      const document = { id: 1, title: 'new' };
      const action = actions.updateDocumentsSuccess(document);
      const newState = documentReducer(initialState, action);
      expect(newState[0].title).toEqual('new');
    });
  });
  describe('delete document reducer', () => {
    xit('should handle document delete', () => {
      const initialState = { documents: [
           { id: 1, title: 'one' },
           { id: 2, title: 'two' }
      ] };

      const action = actions.deleteDocumentSuccess({ id: 1 });
      const newState = documentReducer(initialState.documents, action);

      //expect(newState.length).toEqual(1);
      expect(newState[0].id).toEqual(2);
    });
  });
  describe('load documents reducer', () => {
    it('should handle load documents', () => {
      const initialState = {
        documents: []
      };
      const documents = [
      { title: 'docs' },
      { title: 'doc' }
      ];
      const action = actions.loadsDocumentsSuccess(documents);
      const newState = documentReducer(initialState.documents, action);
      expect(newState[0].title).toEqual('docs');
      expect(newState[1].title).toEqual('doc');
      expect(newState.length).toEqual(2);
    });
  });
  describe('load user documents reducer', () => {
    it('should handle load user documents', () => {
      const initialState = {
        documents: [
          { title: 'doc', userId: '1' },
          { title: 'doc2', userId: '2' },
          { title: 'doc3', userId: '2' },
          { title: 'doc4', userId: '4' }
        ]
      };
      const documents = [
          { title: 'doc2', userId: '2' },
          { title: 'doc3', userId: '2' },
      ];
      const action = actions.getUserDocsSuccess(documents);
      const newState = documentReducer(initialState.documents, action);

      expect(newState.length).toBe(2);
    });
  });
  describe('load role document reducer', () => {
    it('should handle load role documents', () => {
      const initialState = {
        documents: [
          { title: 'role', access: 'admin' },
          { title: 'role2', access: 'admin' },
          { title: 'role3', access: 'owner' },
          { title: 'role4', access: 'editor' }
        ]
      };
      const document = [
        { title: 'role', access: 'admin' },
        { title: 'role2', access: 'admin' },
      ];
      const action = actions.loadRoleDocuments(document);
      const newState = documentReducer(initialState.documents, action);
      expect(newState.length).toBe(2);
      expect(newState[0].access).toEqual('admin');
    });
  });
});
