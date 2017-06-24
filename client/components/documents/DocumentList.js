import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Row, Col, CardPanel, Pagination, Button, Modal, Editor, Link } from 'react-materialize';
import { bindActionCreators } from 'redux';
import UserDetails from './../../actions/UserDetails';
import * as documentActions from './../../actions/DocumentActions';


class DocumentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents,
      isModalOpen: false,
      documentContent: '',
      id: ''
    };
    this.openModal = this.openModal.bind();
  }
  componentDidMount() {
    this.props.actions.loadDocuments();
  }

  componentWillReceiveProps(nextProps) {
    const { documents } = nextProps;
    if (documents !== this.state.documents) {
      this.setState({ documents });
    }
  }
  openModal(id, content) {
    this.setState({ documentContent: content, id: id });
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }
  updateDocument() {
    this.props.actions.updateDocument(this.state.id, { content: this.state.document })
      .then(() => {
        console.log('mimimi')
        swal('Document updated successfully');
      });
  }
  deleteDocument(id) {
    this.props.actions.deleteDocument(id, UserDetails.isUser())
      .then(() => {
        swal('Document deleted successfully');
      });
  }
  handleCreateDoc() {
    this.context.router.history.push('/createdoc');
  }
  render() {
    return (
      <div className="documents">
        <center>
          <Row>
            {this.state.documents.map(document =>
              (<Col s={12} m={5} key={document.id}>
                <CardPanel className="card">
                  <span> <h4>{document.title}</h4>
                    <p>{document.content}</p>
                    <button onClick={() => this.openModal(document.id, document.content)} >
                      EDIT
                    </button>
                    <button onClick={() => this.deleteDocument(document.id)}>DELETE</button>
                  </span>
                </CardPanel>
              </Col>)
            )}
          </Row>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
            {/*<Editor
              handleText={this.handleTextInput}
              updateContent={this.updateDocument}
              label={'EDIT'}
              content={this.state.document}
              closeModal={this.closeModal()}
            />*/}
            <p><button onClick={() => this.closeModal()}>Close</button></p>
          </Modal>
          <Button
            floating
            large
            className="#1a237e indigo darken-4"
            waves="light"
            icon="add"
            onClick={() => this.handleCreateDoc()}
          />
          <Pagination items={8} activePage={2} maxButtons={6} />
        </center>
      </div>
    );
  }
}
DocumentList.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array,
};
DocumentList.contextTypes = {
  router: PropTypes.object.isRequired
};

DocumentList.defaultProps = {
  documents: []
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
