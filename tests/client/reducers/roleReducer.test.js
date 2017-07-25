import expect from 'expect';
import roleReducer from '../../../client/reducers/roleReducer';
import * as actions from '../../../client/actions/roleActions';

describe('roles reducer', () => {
  describe('create role reducer', () => {
    it('should return initial state', () => {
      expect(roleReducer(undefined, {})).toEqual([]);
    });
    it('should handle create role', () => {
      const initialState = {
        roles: [
          { title: 'role' }
        ]
      };
      const role = { title: 'role2' };
      const action = actions.createRoleSuccess(role);

      const newState = roleReducer(initialState.roles, action);
      expect(newState.length).toBe(2);
      expect(newState[1].title).toBe('role2');
    });
  });
  describe('delete role reducer', () => {
    it('should handle role delete', () => {
      const initialState = {
        roles: [
          { id: 1, title: 'one' },
          { id: 2, title: 'two' }
        ]
      };
      const action = actions.deleteRoleSuccess({ id: 1 });
      const newState = roleReducer(initialState.roles, action);
      expect(newState.length).toEqual(1);
      expect(newState[0].id).toEqual(2);
    });
  });
  describe('load roles reducer', () => {
    it('should handle load roles', () => {
      const initialState = {
        roles: []
      };
      const roles = [
        { title: 'admin' },
        { title: 'owner' }
      ];
      const action = actions.loadsRolesSuccess(roles);
      const newState = roleReducer(initialState.roles, action);
      expect(newState[0].title).toEqual('admin');
      expect(newState[1].title).toEqual('owner');
      expect(newState.length).toEqual(2);
    });
  });
});
