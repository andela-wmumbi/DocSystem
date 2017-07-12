import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';
import Update from './../documents/Update';
import * as DocumentActions from './../../actions/documentActions';
import userDetails from './../../actions/userDetails';
import DocumentView from './../documents/DocumentView';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents,
      showmyDocuments: false,
      documentContent: {
        content: '',
        title: '',
        id: ''
      }
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }
  componentWillMount() {
    this.props.actions.getUserDocuments(userDetails.decodeToken(sessionStorage.token).id);
  }
  componentWillReceiveProps(nextProps) {
    const { documents } = nextProps;
    if (documents !== this.state.documents) {
      this.setState({ documents });
    }
  }
  openModal(id, content, title) {
    this.setState({ documentContent: { content, title, id } });
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }
  deleteDocument(id) {
    this.props.actions.deleteDocument(id).then(() => {
      toastr.success('Document deleted successfully');
    })
      .catch(() => {
        toastr.error('Couldnot delete the document');
      });
  }
  render() {
    const { documents, documentContent } = this.state;
    return (
      <div>
        <center>
          <DocumentView
            documents={documents}
            openModal={this.openModal}
            deleteDocument={this.deleteDocument}
          />
          {
            this.state.isModalOpen &&
            <Update
              closeModal={this.closeModal}
              isModalOpen={this.state.isModalOpen}
              document={documentContent}
            />
          }
        </center>
      </div>
    );
  }
}
Header.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired
};
function mapStateToProps(state) {
  return {
    documents: state.documents
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
