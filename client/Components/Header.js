import React from 'react';
import Search from './Search';

const Header = () => (
  <div className="navbar-fixed">
    <ul id="dropdown1" className="dropdown-content">
      <li><a href="/documents">Documents</a></li>
      <li><a href="/about">About</a></li>
    </ul>
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">DocSystem</a>
        <ul className="right hide-on-med-and-down">
          <li><a href=""><i className="material-icons">search</i></a></li>
          <li><a href=""><i className="material-icons">refresh</i></a></li>
          <li><a className="dropdown-button" href="#!" data-activates="dropdown1"><i className="material-icons right">arrow_drop_down</i></a></li>
          <li><a href="/login">LOGIN</a></li>
        </ul>
      </div>
    </nav>
  </div>

);
export default Header;
