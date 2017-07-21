import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-select/dist/react-select.css';
import * as userActions from './../../../actions/userActions';
import SearchDisplay from './SearchDisplay';

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      searchuser: props.searchuser,
      documents: props.userdocuments
    };
  }

  componentDidMount() {
    const title = this.props.location.search.split('=')[1];
    this.props.actions.searchUser(title);
  }

  render() {
    const { userdocuments } = this.props;
    console.log('sd', userdocuments);
    return (
      <div>
        <SearchDisplay
          users={this.props.searchuser}
          documents={this.state.documents}
        />
      </div>
    );
  }
}
SearchUser.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  location: PropTypes.any.isRequired,
  searchuser: PropTypes.array.isRequired,
  userdocuments: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    isSearchError: state.isSearchError,
    searchuser: state.searchuser,
    userdocuments: state.userdocuments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);

