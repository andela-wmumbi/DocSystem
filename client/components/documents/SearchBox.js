import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = props => (
  <div>
    <input
      name="form-field-name"
      onChange={props.handleSearchBoxChange}
      placeholder="Search"
    />
    <button onClick={props.handleSubmit}>Search</button>
  </div>
);

SearchBox.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleSearchBoxChange: PropTypes.func.isRequired,
};

export default SearchBox;
