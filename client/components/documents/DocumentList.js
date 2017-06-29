import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Row, Col, CardPanel, Pagination, Button } from 'react-materialize';
import { bindActionCreators } from 'redux';
import UserDetails from './../../actions/UserDetails';
import Update from './Update';
import Search from './Search';
import * as DocumentActions from './../../actions/DocumentActions';


class DocumentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents,
      isModalOpen: false,
      documentContent: {
        content: '',
        title: '',
        id: ''
      }
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
  openModal(id, content, title) {
    this.setState({ documentContent: { content, title, id } });
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
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
    const { documentContent, documents } = this.state;

    return (
      <div>
        <center>
          <Row >
            {documents.map(document =>
              (<Col s={6} key={document.id} className="col">
                <CardPanel className="card">
                  <span> <h4>{document.title}</h4>
                    <p>{document.content}</p>
                    <button onClick={() =>
                      this.openModal(document.id, document.content, document.title)}
                    >
                      EDIT
                    </button>
                    <button onClick={() =>
                      this.deleteDocument(document.id)}
                    >
                      DELETE
                    </button>
                  </span>
                </CardPanel>
              </Col>)
            )}
          </Row>
          {
            this.state.isModalOpen &&
            <Update
              closeModal={this.closeModal}
              isModalOpen={this.state.isModalOpen}
              document={documentContent}
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
          <Pagination items={8} activePage={2} maxButtons={6} />
        </center >
      </div >
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

// DocumentList.defaultProps = {
//   documents: []
// };

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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
