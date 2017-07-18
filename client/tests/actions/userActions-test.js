import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import expect from 'expect';
import nock from 'nock';
import * as actions from './../../actions/UserActions';
import * as UserApi from '../../apis/UserApi';
import * as types from './../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  describe('User document action ', () => {
    beforeEach(() => {
      const fakeResponse = new Promise(resolve => (
        resolve({
          status: 201,
          body: {}
        })
      ));
      sinon.stub(UserApi, 'register').withArgs({})
        .returns(fakeResponse);
    });

    afterEach(() => {
      UserApi.register.restore();
    });

    it('returns a thunk function', () => {
      const result = actions.registerUser({});
      expect(result).toBeA('function');
    });

    it('should dispatch success action after user is created', () => {
      const expectedActions = [
        {
          type: types.CREATE_USER_SUCCESS
        }
      ];

      const store = mockStore({ users: [] });
      return store.dispatch(actions.registerUser({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
  describe('search user action ', () => {
    it('returns a thunk function', () => {
      const result = actions.searchUser({});
      expect(result).toBeA('function');
    });

    it('should dispatch success action after user is found', () => {
      const fakeResponse = new Promise(resolve => (
        resolve({
          status: 200,
          body: {}
        })
      ));
      const stub = sinon.stub(UserApi, 'getAUser').returns(fakeResponse);
      const expectedActions = [
        {
          type: types.LOAD_USER_SUCCESS,
          userdocuments: {},
        }
      ];

      const store = mockStore({ users: [] });
      return store.dispatch(actions.searchUser({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        stub.restore();
      });
    });

    it('should dispatch failure action after user is not found', () => {
      const fakeResponse = new Promise((reject) => {
        reject(new Error({
          status: 404,
          body: { error: 'not found' }
        }));
      });
      const stub = sinon.stub(UserApi, 'getAUser').rejects(fakeResponse);
      const expectedActions = [
        {
          type: types.GET_A_USER_FAILURE,
          isSearchError: {},
        }
      ];

      const store = mockStore({ documents: [] });
      return store.dispatch(actions.searchUser('error')).catch(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        stub.restore();
      });
    });
  });
  describe('loads users action ', () => {
    it('returns a thunk function', () => {
      const result = actions.loadUsers({});
      expect(result).toBeA('function');
    });

    it('should dispatch success action after all users are found', () => {
      const fakeResponse = new Promise(resolve => (
        resolve({
          status: 200,
          body: {}
        })
      ));
      const stub = sinon.stub(UserApi, 'getAllUsers').returns(fakeResponse);
      const expectedActions = [
        {
          type: types.LOAD_USERS_SUCCESS,
          users: {},
        }
      ];
      const store = mockStore({ users: [] });
      return store.dispatch(actions.loadUsers({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        stub.restore();
      });
    });
    xit('should dispatch failure to load users action', () => {
      const fakeResponse = new Promise((reject) => {
        reject(new Error({
          status: 404,
          body: { error: 'failure to load users' }
        }));
      });
      const stub = sinon.stub(UserApi, 'getAllUsers').rejects(fakeResponse);
      const expectedActions = [
        {
          type: types.AJAX_CALL_ERROR,
          error: {},
        }
      ];

      const store = mockStore({ users: [] });
      return store.dispatch(actions.loadUsers()).catch(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        stub.restore();
      });
    });
  });
  describe('loads users action ', () => {
    it('returns a thunk function', () => {
      const result = actions.deleteUser({});
      expect(result).toBeA('function');
    });

    it('should dispatch success action after user is deleted', () => {
      const fakeResponse = new Promise(resolve => (
        resolve({
          status: 200,
          body: {}
        })
      ));
      const stub = sinon.stub(UserApi, 'getUserDelete').returns(fakeResponse);
      const expectedActions = [
        {
          type: types.DELETE_USER_SUCCESS,
          id: {},
        }
      ];
      const store = mockStore({ users: [] });
      return store.dispatch(actions.deleteUser(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        stub.restore();
      });
    });
    xit('should dispatch failure to load users action', () => {
      const fakeResponse = new Promise((reject) => {
        reject(new Error({
          status: 404,
          body: { error: 'failure to load users' }
        }));
      });
      const stub = sinon.stub(UserApi, 'getAllUsers').rejects(fakeResponse);
      const expectedActions = [
        {
          type: types.AJAX_CALL_ERROR,
          error: {},
        }
      ];

      const store = mockStore({ users: [] });
      return store.dispatch(actions.loadUsers()).catch(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        stub.restore();
      });
    });
  });
  describe('update user action ', () => {
    it('returns a thunk function', () => {
      const result = actions.updateUser({});
      expect(result).toBeA('function');
    });

    it('should dispatch success action after updating user', () => {
      const fakeResponse = new Promise(resolve => (
        resolve({
          status: 200,
          body: {}
        })
      ));
      const stub = sinon.stub(UserApi, 'getUserUpdate').returns(fakeResponse);
      const expectedActions = [
        {
          type: types.UPDATE_USER_SUCCESS,
          user: {},
        }
      ];
      const store = mockStore({ users: [] });
      return store.dispatch(actions.updateUser({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        stub.restore();
      });
    });
  });
  describe('paginate users action ', () => {
    it('should dispatch success action after paginated users', () => {
      nock('http://localhost')
        .get('/api/users?limit=1&offset=0')
        .reply(200, { body: ['user'] });
      const expectedActions = [
        {
          type: types.LOAD_PAGEUSERS_SUCCESS,
          pageUsers: ['user'],
        }
      ];
      const store = mockStore({ documents: [] });
      return store.dispatch(actions.paginateUsers(1, 0)).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
  });
});
