import expect from 'expect';
import userReducer from '../../../client/reducers/UserReducer';
import * as actions from '../../../client/actions/UserActions';

describe('users reducer', () => {
  describe('create user reducer', () => {
    it('should return initial state', () => {
      expect(userReducer(undefined, {})).toEqual([]);
    });
    it('should handle create user', () => {
      const initialState = {
        users: []
      };
      const user = { id: 1, username: 'you', email: 'you@gmail.com', password: 'youyou', roleTitle: 'admin' };
      const action = actions.registerSuccess(user);
      const newState = userReducer(initialState.users, action);
      expect(newState.length).toBe(1);
      expect(newState[0].username).toBe('you');
    });
  });
  describe('update user reducer', () => {
    it('should handle user update', () => {
      const initialState =
        [
          { id: 1, username: 'old' }
        ]
        ;
      const user = { id: 1, username: 'new' };
      const action = actions.updateUserSuccess(user);

      const newState = userReducer(initialState, action);
      expect(newState[0].username).toEqual('new');
    });
  });
  describe('delete user reducer', () => {
    it('should handle user delete', () => {
      const initialState = {
        users: [
          { id: 1, username: 'one' },
          { id: 2, username: 'two' }
        ]
      };
      const action = actions.deleteUserSuccess({ id: 1 });
      const newState = userReducer(initialState.users, action);
      expect(newState.length).toEqual(1);
      expect(newState[0].id).toEqual(2);
    });
  });
  describe('load users reducer', () => {
    it('should handle load users', () => {
      const initialState = {
        users: []
      };
      const users = [
        { username: 'user1' },
        { username: 'user2' }
      ];
      const action = actions.loadsUsersSuccess(users);
      const newState = userReducer(initialState.users, action);
      expect(newState[0].username).toEqual('user1');
      expect(newState[1].username).toEqual('user2');
      expect(newState.length).toEqual(2);
    });
  });
});
