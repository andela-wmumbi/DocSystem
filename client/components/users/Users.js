import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-select/dist/react-select.css';
import { Button } from 'react-materialize';
import Pagination from 'react-js-pagination';
import * as userActions from './../../actions/userActions';
import SearchDisplay from './search/SearchDisplay';
import UsersList from './UsersList';
import UpdateUsers from './UpdateUsers';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      isModalOpen: false,
      userdocuments: props.userdocuments,
      userdocs: props.users,
      users: props.users,
      activePage: 1,
      limit: 4,
      userDetails: {
        id: '',
        username: '',
        email: ''
      }
    };
    // this.handleSearch = this.handleSearch.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props.actions.loadUsers(this.state.limit, 0);
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
  openModal(id, username, email) {
    this.setState({ userDetails: { id, username, email } });
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }
  deleteUser(id) {
    this.props.actions.deleteDocument(id, UserDetails.isUser())
      .then(() => {
        swal('Document deleted successfully');
      });
  }
  // handleCreateDoc() {
  //   this.context.router.history.push('/createdoc');
  // }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.paginateUsers(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }
  // handleChange(event) {
  //   const name = event.target.value;
  //   this.setState({ name });
  // }
  // handleSearch(name) {
  //   this.props.actions.searchUser(name).then(() => {
  //     this.setState({ isViewReady: true });
  //     console.log('asdfasdSADFsd');
  //   });
  // }
  // deleteUser() {
  //   const id = this.state.userDetails.id;
  //   this.props.actions.deleteUser(id);
  // }
  render() {
    const { isViewReady, userdocuments, userDetails, name, users } = this.state;
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
          large
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
  userdocuments: PropTypes.array.isRequired,
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
    userdocuments: state.userdocuments,
    pageUsers: state.pageUsers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);

