import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-select/dist/react-select.css';
import * as UserActions from './../../actions/UserActions';
import SearchDisplay from './SearchDisplay';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      isViewReady: false,
      userdocuments: props.userdocuments,
      userdocs: props.users,
      users: props.users
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.getNames = this.getNames.bind(this);
  }
  componentDidMount() {
    this.props.actions.loadUsers().then(() => {
      this.getNames();
    });
  }
  componentWillReceiveProps(nextProps) {
    const { users } = nextProps;
    if (users !== this.state.users) {
      this.setState({ users });
    }
    const { userdocuments } = nextProps;
    if (userdocuments !== this.state.userdocuments) {
      this.setState({ userdocuments });
    }
  }
  getNames() {
    const { users } = this.state;
    const names = [];
    users.forEach((user) => {
      names.push({ label: user.username, value: user.username });
    });
    this.setState({ names });
  }
  handleSearch(name) {
    this.props.actions.searchUser(name.value).then(() => {
      this.setState({ isViewReady: true });
    });
  }
  render() {
    const { isViewReady, userdocuments } = this.state;
    return (
      <div>
        <div className="search">
          <Select
            name="form-field-name"
            value={''}
            options={this.state.names}
            onChange={this.handleSearch}
            placeholder="Search a user"
          />
          {isViewReady &&
            <SearchDisplay
              documents={userdocuments}
            />
          }
        </div>
      </div>
    );
  }
}
Search.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  userdocuments: PropTypes.array.isRequired,
};
Search.defaultProps = {
  users: []
};
Search.contextTypes = {
  router: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  // users and userdocuments are as named in reducers
  return {
    users: state.users,
    userdocuments: state.userdocuments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);

