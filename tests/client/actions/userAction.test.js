import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import localStorage from 'mock-local-storage';
import expect from 'expect';
import nock from 'nock';
import * as actions from '../../../client/actions/UserActions';
import * as types from '../../../client/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.window = {};
window.sessionStorage = localStorage;
window.sessionStorage.token = 'some token';
describe('Users Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('Register user action ', () => {
    it('should dispatch success action after user is created', () => {
      nock('http://localhost')
        .post('/api/users')
        .reply(201, { body: ['user'] });

      const expectedActions = [{
        type: types.CREATE_USER_SUCCESS,
        user: ['user']
      }];
      const store = mockStore({ users: [], expectedActions });
      return store.dispatch(actions.registerUser({}, sessionStorage.token)).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });

    xit('should dispatch failure action if user is not created', () => {
      nock('http://localhost')
        .post('/api/users')
        .reply(500);
      const expectedActions = {
        type: types.AJAX_CALL_ERROR
      };
      const store = mockStore({ users: [] });
      return store.dispatch(actions.registerUser()).catch(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions.type);
      });
    });
  });
  describe('search user action ', () => {
    it('should dispatch success action after user is found', () => {
      nock('http://localhost')
        .get('/search/users/tim')
        .reply(200, { body: ['tim'] });
      const expectedActions = [
        {
          type: types.LOAD_USER_SUCCESS,
          user: ['tim'],
        }
      ];
      const store = mockStore({ users: [] });
      return store.dispatch(actions.searchUser('tim')).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });

    it('should dispatch failure action after user is not found', () => {
      nock('http://localhost')
        .get(`/search/users${'doc'}`)
        .reply(500);
      const expectedActions = [
        {
          type: types.GET_A_USER_FAILURE,
        }
      ];
      const store = mockStore({ users: [] });
      return store.dispatch(actions.searchUser()).catch(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
  });
  describe('loads users action ', () => {
    it('should dispatch success action after all users is found', () => {
      nock('http://localhost')
        .get('/api/users')
        .reply(200, { body: ['user'] });
      const expectedActions = [
        {
          type: types.LOAD_USERS_SUCCESS,
          users: ['user'],
        }
      ];
      const store = mockStore({ users: [] });
      return store.dispatch(actions.loadUsers()).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
    it('should dispatch failure to load users action', () => {
      nock('http://localhost')
        .get('/api/users')
        .reply(500);
      const expectedActions = [
        {
          type: types.AJAX_CALL_ERROR
        }
      ];
      const store = mockStore({ users: [] });
      return store.dispatch(actions.loadUsers()).catch(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
  });
  describe('update user action ', () => {
    xit('should dispatch success action after updating user', () => {
      nock('http://localhost')
        .put('/api/users/2')
        .reply(200, { body: { user: 'user1' } });
      const expectedActions = [
        {
          type: types.UPDATE_USER_SUCCESS,
          user: 'user2',
        }
      ];
      const store = mockStore({ users: [] });
      return store.dispatch(actions.updateUser(2)).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
  });
  describe('delete user action ', () => {
    it('should dispatch success action after deleting user', () => {
      nock('http://localhost')
        .delete('/api/users/1')
        .reply(200, { data: ['user'] });
      const expectedActions = [
        {
          type: types.DELETE_USER_SUCCESS,
          id: 1,
        }
      ];
      const store = mockStore({ users: [] });
      return store.dispatch(actions.deleteUser(1)).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
    it('should dispatch failure action after deleting user', () => {
      nock('http://localhost')
        .delete('/api/users/1')
        .reply(500);
      const expectedActions = [
        {
          type: types.AJAX_CALL_ERROR
        }
      ];
      const store = mockStore({ users: [] });
      return store.dispatch(actions.deleteUser(1)).catch(() => {
        expect(store.getActions().type).toEqual(expectedActions.type);
      });
    });
  });
  describe('paginate users action ', () => {
    it('should dispatch success action after paginating users', () => {
      nock('http://localhost')
        .get('/api/users?limit=1&offset=0')
        .reply(200, { body: ['user'] });
      const expectedActions = [
        {
          type: types.LOAD_PAGEUSERS_SUCCESS,
          pageUsers: ['user'],
        }
      ];
      const store = mockStore({ users: [] });
      return store.dispatch(actions.paginateUsers(1, 0)).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
    });
  });
});
