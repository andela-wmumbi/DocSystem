import React from 'react';

const HeaderView = () => (
  <div className="navbar-fixed">
    <ul id="dropdown1" className="dropdown-content">
      <li><a href="/documents">Documents</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/createdoc">Create</a></li>
      <li><a href="/mydocuments">Mydocuments</a></li>
    </ul>
    <ul id="dropdown2" className="dropdown-content">
      <li><a href="/searchuser">Users</a></li>
      <li><a href="/searchdocument">Documents</a></li>
    </ul>
    <nav>
      <div className="nav-wrapper">
        <a href="" className="brand-logo">DOCSYSTEM</a>
        <ul className="right hide-on-med-and-down">
          {sessionStorage.token &&
            <div>
              <li><a href=""><i className="material-icons">refresh</i></a></li>
              <li><a href="#!" className="dropdown-button" data-activates="dropdown2"><i className="material-icons">search</i></a></li>
              <li><a className="dropdown-button" href="#!" data-activates="dropdown1"><i className="material-icons right">arrow_drop_down</i></a></li>
              <li><a href="/myprofile" className="material-icons profile-picture">account_circle</a></li>
              <li><a href="/logout">LOGOUT</a></li>
            </div>
          }
        </ul>
      </div>
    </nav>
  </div>
);
export default HeaderView;
