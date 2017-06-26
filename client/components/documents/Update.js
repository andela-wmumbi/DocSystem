import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { Input } from 'react-materialize';
import DocumentList from './DocumentList';
import * as documentActions from './../../actions/DocumentActions';

class UpdateDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents,
      document: props.document,
      documentContent: {
        title: props.document.title,
        content: props.document.content,
        id: props.document.id
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { document } = nextProps;
    if (document !== this.state.document) {
      this.setState({
        documentContent:
        {
          title: this.props.document.title,
          content: this.props.document.content,
          id: this.props.document.id
        }
      });
    }
  }

  handleSave(event) {
    event.preventDefault();
    this.props.actions.updateDocument(this.state.documentContent).then(() => {
      //this.context.router.history.push('/documents');
    });
    this.props.closeModal();
  }
  handleChange(event) {
    const field = event.target.name;
    const documentContent = this.state.documentContent;
    documentContent[field] = event.target.value;
    this.setState({ documentContent });
  }

  render() {
    return (
      <div >
        <ModalContainer onClose={this.props.closeModal} >
          <ModalDialog onClose={this.props.closeModal}>
            <h6>Edit your document</h6>
            <Input
              value={this.state.documentContent.title}
              name="title"
              onChange={this.handleChange}
            />
            <textarea
              name="content"
              onChange={this.handleChange}
              value={this.state.documentContent.content}
            />
            <button onClick={this.handleSave}>Save</button>
          </ModalDialog>
        </ModalContainer >
        <DocumentList
          documents={this.state.document}
        />
      </div >
    );
  }
}
UpdateDocument.propTypes = {
  actions: PropTypes.object,
  document: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  return {
    documents: state.documents
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateDocument);
