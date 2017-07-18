import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import 'react-select/dist/react-select.css';
import { Button } from 'react-materialize';
import Pagination from 'react-js-pagination';
import * as userActions from './../../actions/userActions';
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
      userDetails: {
        id: '',
        username: '',
        email: '',
        role: '',
      }
    };
    // this.handleSearch = this.handleSearch.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props.actions.loadUsers();
    this.props.actions.paginateUsers(this.state.limit, 0);
  }
  componentWillReceiveProps(nextProps) {
    const { users } = nextProps;
    if (users !== this.state.users) {
      this.setState({ users });
    }
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
  // handleCreateDoc() {
  //   this.context.router.history.push('/createdoc');
  // }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.paginateUsers(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }
  // handleSearch(name) {
  //   this.props.actions.searchUser(name).then(() => {
  //     this.setState({ isViewReady: true });
  //   });
  // }
  // deleteUser() {
  //   const id = this.state.userDetails.id;
  //   this.props.actions.deleteUser(id);
  // }
  render() {
    const { userDetails, users } = this.state;
    const { pageUsers } = this.props;
    return (
      <div>
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
          />
        }
        <Button
          floating
          small
          className="#1a237e indigo darken-4"
          waves="light"
          icon="add"
          onClick={() => this.handleCreateDoc()}
        />
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.limit}
          totalItemsCount={users.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div >
    );
  }
}
Users.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
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
    users: state.users,
    pageUsers: state.pageUsers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);

