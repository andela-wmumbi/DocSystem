import React, { Component, PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { Input } from 'react-materialize';
import * as documentActions from './../../actions/DocumentActions';

class UpdateDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: props.document,
      documentUpdate: { title: '', content: '' },
      documentContent:
      {
        title: '',
        content: '',
        id: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // const { document } = nextProps;
    // if (document !== this.state.document) {
    //   this.setState({
    //     documentContent:
    //     {
    //       title: this.props.document.title,
    //       content: this.props.document.content,
    //       id: this.props.document.id
    //     }
    //   });
    // }
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.updateDocument(this.state.documentUpdate).then(() => {
      // this.context.router.history.push('/documents');
    });
  }

  handleChange(event) {
    const field = event.target.name;
    const documentUpdate = this.state.documentUpdate;
    documentUpdate[field] = event.target.value;
    this.setState({ documentUpdate });
  }

  render() {
    return (
      <ModalContainer onClose={this.props.closeModal}>
        <ModalDialog onClose={this.props.closeModal}>
          <Input
            defaultValue={this.state.document.title}
            value={this.state.documentUpdate.title}
            name="title"
            onChange={this.handleChange}
          />
          <textarea
            name="content"
            onChange={this.handleChange}
            defaultValue={this.state.document.content}
            value={this.state.documentUpdate.content}
          />
        </ModalDialog>
      </ModalContainer>
    );
  }
}
UpdateDocument.propTypes = {
  actions: PropTypes.object,
  document: PropTypes.object.isRequired
};
export default UpdateDocument;
