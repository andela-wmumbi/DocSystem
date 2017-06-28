import React, { Component } from 'react';
import { ModalContainer, ModalDialog, Input } from 'react-materialize';
import * as UserActions from './../../actions/UserActions';
import Modal from 'react-modal';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //this.props.actions.loadUserDetails();
  }

  // openModal(id, content, title) {
  //   this.setState({ documentContent: { content, title, id } });
  //   this.setState({ isModalOpen: true });
  // }
  // closeModal() {
  //   this.setState({ isModalOpen: false });
  // }
  render() {
    return (
      <div>
      </div>
    );
  }
}
export default Profile;

