import React from 'react';
import cx from 'classnames';
import { Icon } from 'react-materialize';

const Search = () => (
  <li className="search">
    <div >
      <input
        id="search"
        ref="search"
        onChange={this.search}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
      <Icon>search</Icon>
      <div className="search-results" />
    </div>
  </li>
);
export default Search;
