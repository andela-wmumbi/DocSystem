import expect from 'expect';
import userReducer from './../../reducers/userReducer';
import * as actions from './../../actions/userActions';

describe('users reducer', () => {
  describe('create user reducer', () => {
    it('should return initial state', () => {
      expect(userReducer(undefined, {})).toEqual([]);
    });
    it('should handle create user', () => {
      const initialState = {
        users: [
          { username: 'me' }
        ]
      };
      const user = { username: 'you' };
      const action = actions.registerSuccess(user);

      const newState = userReducer(initialState.users, action);
      console.log(newState)
      expect(newState.length).toBe(2);
      expect(newState[0].username).toBe('you');
    });
  });
  describe('update document reducer', () => {
    xit('should handle document update', () => {
      const initialState = {
        documents: [
          { id: 1, title: 'old' }
        ]
      };
      const document = { id: 2, title: 'new' };
      const action = actions.updateDocumentsSuccess(document);

      const newState = userReducer(initialState, action);

      expect(newState[0]).toEqual(2);
      expect(newState[0].title).toEqual('new');
    });
  });
  describe('delete document reducer', () => {
    xit('should handle document delete', () => {
      const initialState = {
        documents: [
           { id: 1, title: 'one' },
           { id: 2, title: 'two' }
        ]
      };
      const action = actions.deleteDocumentSuccess(1);
      const newState = userReducer(initialState.documents, action);
      expect(newState.length).toEqual(1);
      expect(newState[0].id).toEqual(2);
    });
  });
  describe('load documents reducer', () => {
    xit('should handle load documents', () => {
      const initialState = {
        documents: []
      };
      const documents = [
      { title: 'docs' },
      { title: 'doc' }
      ];
      const action = actions.loadsDocumentsSuccess(documents);
      const newState = userReducer(initialState.documents, action);
      expect(newState[0].title).toEqual('docs');
      expect(newState[1].title).toEqual('doc');
      expect(newState.length).toEqual(2);
    });
  });
  describe('load user documents reducer', () => {
    xit('should handle load user documents', () => {
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
      const newState = userReducer(initialState.documents, action);

      expect(newState.length).toBe(2);
    });
  });
  describe('load role document reducer', () => {
    xit('should handle load role documents', () => {
      const initialState = {
        documents: [
          { title: 'role', access: 'admin' },
          { title: 'role2', access: 'admin' },
          { title: 'role3', access: 'owner' },
          { title: 'role4', access: 'editor' }
        ]
      };
      const documents = [
         { title: 'role', access: 'admin' },
        { title: 'role2', access: 'admin' },
      ];
      const action = actions.loadRoleDocuments(documents);
      const newState = userReducer(initialState.documents, action);
      expect(newState.length).toBe(2);
      expect(newState[0].access).toEqual('admin');
    });
  });
});
