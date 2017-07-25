import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { Input, Row } from 'react-materialize';
import * as userActions from './../../actions/UserActions';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {
        username: '',
        email: '',
        password: '',
        roleTitle: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleSave(event) {
    const { userDetails } = this.state;
    event.preventDefault();
    this.props.actions.register(userDetails).then(() => {
      toastr.success('User create successfully');
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
    const { userDetails } = this.state;
    return (
      <div >
        {this.props.isModalOpen &&
          <ModalContainer onClose={this.props.closeModal} >
            <ModalDialog onClose={this.props.closeModal}>
              <Row>
                <Input
                  label="Name"
                  value={userDetails.username}
                  name="username"
                  onChange={this.handleChange}
                />
              </Row>
              <Row>
                <Input
                  label="Email"
                  name="email"
                  onChange={this.handleChange}
                  value={userDetails.email}
                />
              </Row>
              <Row>
                <Input
                  s={12}
                  type="select"
                  label="Role"
                  value={userDetails.role}
                  name="roleTitle"
                  onChange={this.handleChange}
                >
                  <option value={userDetails.role}>{userDetails.role}</option>
                  <option value="staff">staff</option>
                </Input>
              </Row>
              <button onClick={this.handleSave}>Save</button>
            </ModalDialog>
          </ModalContainer >
        }
      </div >
    );
  }
}
CreateUser.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.func.isRequired,
};
CreateUser.contextTypes = {
  router: PropTypes.object.isRequired
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(CreateUser);
