import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import 'react-select/dist/react-select.css';
import { Button } from 'react-materialize';
import Pagination from 'react-js-pagination';
import * as userActions from './../../actions/userActions';
import * as roleActions from './../../actions/roleActions';
import SearchBox from './../documents/SearchBox';
import UsersList from './UsersList';
import UpdateUsers from './UpdateUsers';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      isModalOpen: false,
      users: props.users,
      activePage: 1,
      limit: 4,
      roles: [],
      userDetails: {
        id: '',
        username: '',
        email: '',
        role: '',
      },
      searchName: '',
    };
    // this.handleSearch = this.handleSearch.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getRoles = this.getRoles.bind(this);
  }
  componentDidMount() {
    this.props.actions.loadUsers();
    this.props.actions.loadRoles().then(() => {
      this.getRoles();
    });
    this.props.actions.paginateUsers(this.state.limit, 0);
  }
  componentWillReceiveProps(nextProps) {
    const { users } = nextProps;
    if (users !== this.state.users) {
      this.setState({ users });
    }
  }
  getRoles() {
    const roles = this.props.roles;
    const copy = [];
    roles.forEach((role) => {
      copy.push(role.title);
      this.setState({ roles: copy });
    });
  }

  openModal(id, username, email, role) {
    this.setState({ userDetails: { id, username, email, role } });
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }
  deleteUser(id) {
    this.props.actions.deleteUser(id)
      .then(() => {
        toastr.success('User deleted succesfully');
      })
      .catch(() => {
        toastr.success('Couldnot delete user');
      });
  }
  handleCreateUser() {
    this.context.router.history.push('/createuser');
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.paginateUsers(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }
  handleSearch() {
    this.context.router.history.push(`/users-search?title=${this.state.searchName}`);
  }
  handleSearchBoxChange(event) {
    let searchName = this.state.searchName;
    searchName = event.target.value;
    this.setState({ searchName });
  }
  render() {
    const { userDetails, users, roles } = this.state;
    const { pageUsers } = this.props;
    return (
      <div>
        <center>
        {/* <div style={{ margin: '0 auto', width: '30%' }}>
          <SearchBox
            handleSubmit={this.handleSearch}
            handleSearchBoxChange={this.handleSearchBoxChange}
          />
        </div> */}
        <UsersList
          users={pageUsers}
          deleteUser={this.deleteUser}
          openModal={this.openModal}
        />
        {
          this.state.isModalOpen &&
          <UpdateUsers
            closeModal={this.closeModal}
            isModalOpen={this.state.isModalOpen}
            user={userDetails}
            roles={roles}
          />
        }
        <Button
          floating
          small
          className="#1a237e indigo darken-4"
          waves="light"
          icon="add"
          onClick={() => this.handleCreateUser()}
        />
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.limit}
          totalItemsCount={users.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
        </center>
      </div >
    );
  }
}
Users.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  pageUsers: PropTypes.array.isRequired
};
Users.defaultProps = {
  users: []
};
Users.contextTypes = {
  router: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  // users and userdocuments are as named in reducers
  return {
    roles: state.roles,
    users: state.users,
    pageUsers: state.pageUsers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, roleActions), dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);

