import React from 'react';
import UserDetails from './../../actions/userDetails';

const HeaderView = () => {
  const token = sessionStorage.getItem('token');
  const user = token && UserDetails.decodeToken(token);
  const username = token && user.username.toUpperCase();
  return (
    <div className="navbar-fixed">
      <ul id="dropdown1" className="dropdown-content" />
      <ul id="dropdown2" className="dropdown-content">
        <li><a href="/users">Users</a></li>
        <li><a href="/roles">Roles</a></li>
      </ul>
      <nav>
        <div className="nav-wrapper">
          <a href="" className="brand-logo">DOCSYSTEM</a>
          <ul className="right hide-on-med-and-down">
            {sessionStorage.token &&
              <div>
                <div className="nav-items">
                  <li><a href="/documents">
                Documents</a>
                  </li>
                  <li><a href="/mydocuments">
                My documents</a>
                  </li>
                  <li><a href="/roleDocuments">
                    {user.roleTitle} Documents
                   </a>
                  </li>
                </div>
                  { user.roleTitle === 'admin' &&
                  <div id="nav-items2">
                    <li><a className="dropdown-button" href="#!" data-activates="dropdown2">
                      <i className="material-icons right">arrow_drop_down</i></a>
                    </li>
                  </div>
                   }
                <div className="nav-items2">
                  <li><a href="/logout">LOGOUT:{username}</a></li>
                </div>
              </div>
          }
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default HeaderView;
