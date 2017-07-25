import React, { Component } from 'react';
import * as userActions from './../../actions/userActions';
import UserDetails from './../../actions/userDetails';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {
        id: '',
        username: '',
        createdAt: '',
        role: '',
        email: ''
      },
      isModalOpen: false
    };
    this.getUserDetails = this.getUserDetails.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    this.getUserDetails();
  }
  getUserDetails() {
    const details = UserDetails.decodeToken(sessionStorage.token);
    this.setState({
      userDetails: {
        id: details.id,
        username: details.username,
        createdAt: details.createdAt,
        role: details.roleId,
        email: details.email
      }
    });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }
  render() {
    const { userDetails } = this.state;
    return (
      <div >
        {/*<ModalContainer>
          <ModalDialog >
            <h6>My profile</h6>
            <Input
              value={userDetails.username}
              name="title"
            />
            <Input
              name="content"
              value={userDetails.email}
            />
            <button onClick={this.handleSave}>Save</button>
          </ModalDialog>
        </ModalContainer >*/}
      </div>
    );
  }
}
export default Profile;

