import React from 'react';
import UserDetails from './../../actions/userDetails';

const HeaderView = () => {
  const token = sessionStorage.getItem('token');
  const user = token && UserDetails.decodeToken(token);
  return (
    <div className="navbar-fixed">
      <ul id="dropdown1" className="dropdown-content">
         {/* <li><a href="/users">{user.username}</a></li> */}
      </ul>
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
                  <li><a href="#!">
                    {/* <i className="material-icons">home</i> */}
                Home</a>
                  </li>
                  <li><a href="/documents">
                    {/* <i className="material-icons">folder</i> */}
                Documents</a>
                  </li>
                  <li><a href="/mydocuments">
                    {/* <i className="material-icons">folder-open</i> */}
                My documents</a>
                  </li>
                  <li><a href="/roleDocuments">
                    {/* <i className="material-icons">file-folder-shared</i> */}
                Role Documents
                </a>
                  </li>
                  <li><a href="/mydocuments">
                    {/* <i className="material-icons">file-folder-shared</i> */}
                  </a>
                  </li>
                </div>
                 {/* { user.roleTitle === 'admin' && */}
                <div>
                   <li><a className="dropdown-button" href="#!" data-activates="dropdown2">
                    <i className="material-icons right">arrow_drop_down</i></a>
                  </li>
                 </div>
                  {/* } */}
                 <li><a href="/logout">LOGOUT</a></li>
              </div>

          }
            {sessionStorage.token &&
            <li><a className="dropdown-button" href="#!" data-activates="dropdown1">
              <i className="material-icons left">account_circle arrow_drop_down</i></a>
            </li>
              }
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default HeaderView;
