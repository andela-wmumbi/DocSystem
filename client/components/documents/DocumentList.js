import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Button } from 'react-materialize';
import Pagination from 'react-js-pagination';
import UserDetails from './../../actions/userDetails';
import Update from './Update';
import AllDocuments from './AllDocuments';
import * as DocumentActions from './../../actions/documentActions';


class DocumentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents,
      isModalOpen: false,
      activePage: 1,
      limit: 4,
      documentContent: {
        content: '',
        title: '',
        id: ''
      }
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props.actions.loadDocuments(this.state.limit, 0);
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
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.paginateDocuments(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }
  render() {
    const { documentContent, documents } = this.state;
    const { pageDocuments } = this.props
    return (
      <div>
        <center>
          <AllDocuments
            documents={pageDocuments}
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
          <Button
            floating
            large
            className="#1a237e indigo darken-4"
            waves="light"
            icon="add"
            onClick={() => this.handleCreateDoc()}
          />
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.limit}
            totalItemsCount={documents.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </center >
      </div >
    );
  }
}
DocumentList.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired
};
DocumentList.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    documents: state.documents,
    pageDocuments: state.pageDocuments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
