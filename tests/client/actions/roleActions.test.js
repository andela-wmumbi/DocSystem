import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as actions from '../../../client/actions/roleActions';
import * as types from '../../../client/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.window = {};
window.sessionStorage = localStorage;
window.sessionStorage.token = 'some token';
describe('role actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('should dispatch success action after role is created', () => {
    nock('http://localhost')
      .post('/api/roles')
      .reply(201, { body: ['role'] });

    const expectedActions = [{
      type: types.CREATE_ROLE_SUCCESS,
      role: ['role']
    }];
    const store = mockStore({ roles: [], expectedActions });
    return store.dispatch(actions.createRole({})).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });
  it('should dispatch failure action if role is not created', () => {
    nock('http://localhost')
      .post('/api/roles')
      .reply(500);
    const expectedActions = {
      type: types.AJAX_CALL_ERROR
    };
    const store = mockStore({ roles: [] });
    return store.dispatch(actions.createRole()).catch(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions.type);
    });
  });
  it('should dispatch success action after all roles are found', () => {
    nock('http://localhost')
      .get('/api/roles')
      .reply(200, { body: ['role'] });
    const expectedActions = [
      {
        type: types.LOAD_ROLES_SUCCESS,
        documents: ['role'],
      }
    ];
    const store = mockStore({ roles: [] });
    return store.dispatch(actions.loadRoles()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });
  it('should dispatch failure to load roles action', () => {
    nock('http://localhost')
      .get('/api/roles')
      .reply(500);
    const expectedActions = [
      {
        type: types.AJAX_CALL_ERROR
      }
    ];
    const store = mockStore({ roles: [] });
    return store.dispatch(actions.loadRoles()).catch(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });
  it('should dispatch success action after deleting role ', () => {
    nock('http://localhost')
      .delete('/api/roles/2')
      .reply(200, {
        roles: { title: 'owner' }
      });

    const expectedActions = [
      {
        type: types.DELETE_ROLE_SUCCESS,
        id: 2,
      }
    ];
    const store = mockStore({ roles: [] }, expectedActions);
    store.dispatch(actions.deleteRole(2)).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });
  it('should dispatch failure action if unable to delete role', () => {
    nock('http://localhost')
      .delete('/api/roles/1')
      .reply(500);
    const expectedActions = [
      {
        type: types.AJAX_CALL_ERROR
      }
    ];
    const store = mockStore({ roles: [] });
    return store.dispatch(actions.deleteRole(1)).catch(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });
});
