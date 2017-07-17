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
    it('returns a thunk function', () => {
      const result = actions.createDocument({});
      expect(result).toBeA('function');
    });

    it('should dispatch success action after doc is created', () => {
      nock('http://localhost')
        .post('/api/documents')
        .reply(201);

      const expectedActions = [{
        type: types.CREATE_DOCUMENT_SUCCESS,
        document: {}
      }];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.createDocument({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    xit('should dispatch failure action if  doc is not created', () => {
      nock('http://localhost')
        .post('/api/documents')
        .reply(500);

      const expectedActions = {
        type: types.AJAX_CALL_ERROR,
        Error: 'Bad Request'
      };
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.createDocument()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
  describe('search document action ', () => {
    xit('should dispatch success action after doc is found', () => {
      nock('http://localhost')
        .post('/search/documents/doc')
        .reply(200);
      const expectedActions = [
        {
          type: types.GET_A_DOCUMENT_SUCCESS,
          document: {},
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.searchDocument({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch failure action after doc is not found', () => {
      const fakeResponse = new Promise((reject) => {
        reject(new Error({
          status: 404,
          body: { error: 'not found' }
        }));
      });
      const stub = sinon.stub(DocApi, 'getADocument').rejects(fakeResponse);
      const expectedActions = [
        {
          type: types.GET_A_DOCUMENT_FAILURE,
          isSearchError: {},
        }
      ];

      const store = mockStore({ documents: [] });
      return store.dispatch(actions.searchDocument('error')).catch(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        stub.restore();
      });
    });
  });
  describe('loads documents action ', () => {
    it('returns a thunk function', () => {
      const result = actions.loadDocuments({});
      expect(result).toBeA('function');
    });

    it('should dispatch success action after all docs is found', () => {
      const fakeResponse = new Promise(resolve => (
        resolve({
          status: 200,
          body: {}
        })
      ));
      const stub = sinon.stub(DocApi, 'getAllDocuments').returns(fakeResponse);
      const expectedActions = [
        {
          type: types.LOAD_DOCUMENTS_SUCCESS,
          documents: {},
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.loadDocuments({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        stub.restore();
      });
    });
    xit('should dispatch failure to load documents action', () => {
      const fakeResponse = new Promise((reject) => {
        reject(new Error({
          status: 404,
          body: { error: 'failure to load documents' }
        }));
      });
      const stub = sinon.stub(DocApi, 'getAllDocuments').rejects(fakeResponse);
      const expectedActions = [
        {
          type: types.AJAX_CALL_ERROR,
          error: {},
        }
      ];

      const store = mockStore({ documents: [] });
      return store.dispatch(actions.loadDocuments()).catch(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        stub.restore();
      });
    });
  });
  describe('loads roledocuments action ', () => {
    it('returns a thunk function', () => {
      const result = actions.loadRoleDocuments({});
      expect(result).toBeA('function');
    });

    it('should dispatch success action after roledocuments docs are found', () => {
      const fakeResponse = new Promise(resolve => (
        resolve({
          status: 200,
          body: {}
        })
      ));
      const stub = sinon.stub(DocApi, 'getRoleDocuments').returns(fakeResponse);
      const expectedActions = [
        {
          type: types.GET_ROLE_DOCUMENTS,
          documents: {},
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.loadRoleDocuments({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        stub.restore();
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
    it('returns a thunk function', () => {
      const result = actions.updateDocument({});
      expect(result).toBeA('function');
    });

    it('should dispatch success action after updating document', () => {
      const fakeResponse = new Promise(resolve => (
        resolve({
          status: 200,
          body: {}
        })
      ));
      const stub = sinon.stub(DocApi, 'getDocumentUpdate').returns(fakeResponse);
      const expectedActions = [
        {
          type: types.UPDATE_DOCUMENT_SUCCESS,
          document: {},
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.updateDocument({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        stub.restore();
      });
    });
  });
  describe('delete document action ', () => {
    it('returns a thunk function', () => {
      const result = actions.deleteDocument({});
      expect(result).toBeA('function');
    });

    it('should dispatch success action after deleting document', () => {
      const fakeResponse = new Promise(resolve => (
        resolve({
          status: 200,
          body: {}
        })
      ));
      const stub = sinon.stub(DocApi, 'getDocumentDelete').returns(fakeResponse);
      const expectedActions = [
        {
          type: types.DELETE_DOCUMENT_SUCCESS,
          id: undefined,
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.deleteDocument({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        stub.restore();
      });
    });
  });
  describe('get userdocuments action ', () => {
    it('returns a thunk function', () => {
      const result = actions.getUserDocuments({});
      expect(result).toBeA('function');
    });

    it('should dispatch success action after getting userdocuments', () => {
      const fakeResponse = new Promise(resolve => (
        resolve({
          status: 200,
          body: {}
        })
      ));
      const stub = sinon.stub(DocApi, 'getUserDocs').returns(fakeResponse);
      const expectedActions = [
        {
          type: types.GET_USER_DOCUMENTS,
          documents: undefined,
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.getUserDocuments({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        stub.restore();
      });
    });
  });
  describe('paginate documents action ', () => {
    it('returns a thunk function', () => {
      const result = actions.paginateDocuments({});
      expect(result).toBeA('function');
    });

    it('should dispatch success action after paginating documents', () => {
      const fakeResponse = new Promise(resolve => (
        resolve({
          status: 200,
          body: {}
        })
      ));
      const stub = sinon.stub(DocApi, 'getPagination').returns(fakeResponse);
      const expectedActions = [
        {
          type: types.LOAD_PAGEDOCUMENTS_SUCCESS,
          pageDocuments: {},
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.paginateDocuments({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        stub.restore();
      });
    });
  });
});
