import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import localStorage from 'mock-local-storage';
import sinon from 'sinon';
import expect from 'expect';
import nock from 'nock';
import * as actions from '../../actions/documentActions';
import * as DocApi from '../../apis/DocumentApi';
import * as types from './../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.window = {};
window.sessionStorage = localStorage;
window.sessionStorage.token = 'some token';
describe('Document Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('Create document action ', () => {
    it('should dispatch success action after doc is created', () => {
      nock('http://localhost')
        .post('/api/documents')
        .reply(201, { body: ['doc'] });

      const expectedActions = [{
        type: types.CREATE_DOCUMENT_SUCCESS,
        document: ['doc']
      }];
      const store = mockStore({ documents: [], expectedActions });
      return store.dispatch(actions.createDocument({}, sessionStorage.token)).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });

    xit('should dispatch failure action if  doc is not created', () => {
      nock('http://localhost')
        .post('/api/documents')
        .reply(400);
      const expectedActions = {
        type: types.AJAX_CALL_ERROR
      };
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.createDocument()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
  describe('search document action ', () => {
    it('should dispatch success action after doc is found', () => {
      nock('http://localhost')
        .get(`/search/documents/${'doc'}`)
        .reply(200, { body: ['doc'] });
      const expectedActions = [
        {
          type: types.GET_A_DOCUMENT_SUCCESS,
          document: ['doc'],
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.searchDocument('doc')).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });

    it('should dispatch failure action after doc is not found', () => {
      nock('http://localhost')
        .get(`/search/documents/${'doc'}`)
        .reply(404);
      const expectedActions = [
        {
          type: types.GET_A_DOCUMENT_FAILURE,
          isSearchError: {},
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.searchDocument('error')).catch(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
  });
  describe('loads documents action ', () => {
    it('should dispatch success action after all docs is found', () => {
      nock('http://localhost')
        .get('/api/documents')
        .reply(200, { body: ['doc'] });
      const expectedActions = [
        {
          type: types.LOAD_DOCUMENTS_SUCCESS,
          documents: ['doc'],
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.loadDocuments()).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
    xit('should dispatch failure to load documents action', () => {
      nock('http://localhost')
        .get('/api/documents')
        .reply(500);
      const expectedActions = [
        {
          type: types.AJAX_CALL_ERROR,
          error: {},
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.loadDocuments()).catch(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
  });
  describe('loads roledocuments action ', () => {
    it('should dispatch success action after roledocuments docs are found', () => {
      nock('http://localhost')
        .get(`/api/roleDocuments/${'admin'}`)
        .reply(200, { body: ['doc'] });
      const expectedActions = [
        {
          type: types.GET_ROLE_DOCUMENTS,
          documents: ['doc'],
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.loadRoleDocuments('admin')).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
    xit('should dispatch failure to load roledocuments action', () => {
      const fakeResponse = new Promise((reject) => {
        reject(new Error({
          status: 404,
          body: { error: 'failure to load roledocuments' }
        }));
      });
      const stub = sinon.stub(DocApi, 'getRoleDocuments').rejects(fakeResponse);
      const expectedActions = [
        {
          type: types.AJAX_CALL_ERROR,
          error: {},
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.loadRoleDocuments({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        stub.restore();
      });
    });
  });
  describe('update document action ', () => {
    xit('should dispatch success action after updating document', () => {
      nock('http://localhost')
        .put('/api/documents/1')
        .reply(200, { body: ['doc'] });
      const expectedActions = [
        {
          type: types.UPDATE_DOCUMENT_SUCCESS,
          document: ['doc'],
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.updateDocument(1)).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
  });
  describe('delete document action ', () => {
    it('should dispatch success action after deleting document', () => {
      nock('http://localhost')
        .delete('/api/documents/1')
        .reply(200, { body: [] });
      const expectedActions = [
        {
          type: types.DELETE_DOCUMENT_SUCCESS,
          document: [],
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.deleteDocument(1)).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
    xit('should dispatch success action after deleting document', () => {
      nock('http://localhost')
        .delete('/api/documents/1')
        .reply(500);
      const expectedActions = [
        {
          type: types.AJAX_CALL_ERROR
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.deleteDocument(1)).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
  });
  describe('get userdocuments action ', () => {
    it('should dispatch success action after getting userdocuments', () => {
      nock('http://localhost')
        .get('/users/1/documents')
        .reply(200, { body: ['doc'] });
      const expectedActions = [
        {
          type: types.GET_USER_DOCUMENTS,
          documents: ['doc'],
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.getUserDocuments(1)).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
  });
  describe('paginate documents action ', () => {
    it('should dispatch success action after paginating documents', () => {
      nock('http://localhost')
        .get('/api/documents?limit=1&offset=0')
        .reply(200, { body: ['doc'] });
      const expectedActions = [
        {
          type: types.LOAD_PAGEDOCUMENTS_SUCCESS,
          pageDocuments: ['doc'],
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.paginateDocuments(1, 0)).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
  });
});
