import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import UserDetails from './../../actions/userDetail';
import * as documentActions from './../../actions/documentActions';
import DocumentView from './../documents/DocumentView';
import UpdateDocument from './../documents/UpdateDocument';

class RoleDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentContent: {
        content: '',
        title: '',
        id: '',
        userId: ''
      }
    };
    this.handleCreateDoc = this.handleCreateDoc.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }
  componentDidMount() {
    const role = UserDetails.decodeToken(sessionStorage.token).roleTitle;
    this.props.actions.loadRoleDocuments(role);
  }
  handleCreateDoc() {
    this.context.router.history.push('/createdoc');
  }
  openModal(id, content, title, userId) {
    this.setState({ documentContent: { content, title, id, userId } });
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }
  deleteDocument(id) {
    this.props.actions.deleteDocument(id).then(() => {
    });
  }
  render() {
    const { documentContent } = this.state;
    const { documents } = this.props;
    return (
      <div>
        <DocumentView
          documents={documents}
          openModal={this.openModal}
          deleteDocument={this.deleteDocument}
        />
        {
          this.state.isModalOpen &&
          <UpdateDocument
            closeModal={this.closeModal}
            isModalOpen={this.state.isModalOpen}
            document={documentContent}
          />
        }
        <Button
          floating
          className="#1a237e indigo darken-4"
          waves="light"
          icon="add"
          onClick={this.handleCreateDoc}
        />
      </div>
    );
  }
}
RoleDocuments.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired
};
RoleDocuments.contextTypes = {
  router: PropTypes.object.isRequired
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
export default connect(mapStateToProps, mapDispatchToProps)(RoleDocuments);
