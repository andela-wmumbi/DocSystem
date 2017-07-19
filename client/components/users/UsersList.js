import React, { PropTypes } from 'react';

const UsersList = props => (
  <div>
      <table className="centered">
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.roleTitle}</td>
              <td>
                <button onClick={() =>
                  props.openModal(user.id, user.username, user.email, user.roleTitle)}
                >
                  <i className="tiny material-icons">mode_edit</i>
                </button>
                <button onClick={() =>
                  props.deleteUser(user.id)}
                >
                  <i className="tiny material-icons">delete</i>
                </button>

              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
  </div>
);
UsersList.propTypes = {
  users: PropTypes.array.isRequired
};
export default UsersList;
