import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import expect from 'expect';
import nock from 'nock';
import * as actions from './../../actions/roleActions';
import * as UserApi from '../../apis/RoleApi';
import * as types from './../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('role actions', () => {
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
});
