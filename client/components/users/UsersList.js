import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';

const UsersList = props => (
  <div>
    <ul className="collection">
      {props.users.map(user => (
        <li className="collection-item avatar">
          <img src="./../../../public/images/user.png" alt="" className="circle" />
          <span className="title">{user.username}</span>
          <p>{user.email}<br />
            {user.createdAt}
          </p>
          <div className="avatar">
            <button onClick={() =>
              props.openModal(user.id, user.username)}
            >
              <i className="small material-icons">mode_edit</i>
            </button>
            <button onClick={() =>
              props.deleteUser(user.id)}
            >
              <i className="small material-icons">delete</i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
export default UsersList;
