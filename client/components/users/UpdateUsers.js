import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { Input } from 'react-materialize';
import * as userActions from './../../actions/userActions';

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      userDetails: {
        id: props.user.id,
        username: props.user.username,
        email: props.user.email
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleSave(event) {
    const { userDetails } = this.state;
    event.preventDefault();
    this.props.actions.updateUser(userDetails).then(() => {
      toastr.success('User updated successfully');
    })
    .catch(() => {
      toastr.success('Couldnot delete user');
    });
    this.props.closeModal();
  }
  handleChange(event) {
    const field = event.target.name;
    const userDetails = this.state.userDetails;
    userDetails[field] = event.target.value;
    this.setState({ userDetails });
  }

  render() {
    return (
      <div >
        {this.props.isModalOpen &&
          <ModalContainer onClose={this.props.closeModal} >
            <ModalDialog onClose={this.props.closeModal}>
              <h6>Edit profile</h6>
              <Input
                value={this.state.userDetails.username}
                name="username"
                onChange={this.handleChange}
              />
              <textarea
                name="email"
                onChange={this.handleChange}
                value={this.state.userDetails.email}
              />
              <button onClick={this.handleSave}>Save</button>
            </ModalDialog>
          </ModalContainer >
        }
      </div >
    );
  }
}
UpdateUser.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.func.isRequired,
};
UpdateUser.contextTypes = {
  router: PropTypes.object.isRequired
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(UpdateUser);
