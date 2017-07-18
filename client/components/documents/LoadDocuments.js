import React, { Component } from 'react';
import { PropTypes } from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import toastr from 'toastr';
import Pagination from 'react-js-pagination';
import UpdateDocument from './UpdateDocument';
import DocumentView from './DocumentView';
import SearchBox from './SearchBox';
import * as documentActions from './../../actions/documentActions';

class LoadDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      isModalOpen: false,
      activePage: 1,
      limit: 4,
      documentContent: {
        content: '',
        title: '',
        id: '',
        userId: ''
      },
      searchTitle: '',
    };
    this.handleCreateDoc = this.handleCreateDoc.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.props.actions.loadDocuments();
    this.props.actions.paginateDocuments(this.state.limit, 0);
  }
  componentWillReceiveProps(nextProps) {
    const { documents } = nextProps;
    if (documents !== this.state.documents) {
      this.setState({ documents });
    }
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
      toastr.success('Document deleted successfully');
    })
      .catch(() => {
        toastr.error('Couldnot delete the document');
      });
  }
  handleCreateDoc() {
    this.context.router.history.push('/createdoc');
  }
  handleSearch() {
    this.context.router.history.push(`/documents-search?title=${this.state.searchTitle}`);
  }
  handleSearchBoxChange(event) {
    let searchTitle = this.state.document;
    searchTitle = event.target.value;
    this.setState({ searchTitle });
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.paginateDocuments(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }
  render() {
    const { documentContent, documents } = this.state;
    const { pageDocuments } = this.props;
    return (
      <div>
        <center>
          <div style={{ margin: '0 auto', width: '30%' }}>
            <SearchBox
              handleSubmit={this.handleSearch}
              handleSearchBoxChange={this.handleSearchBoxChange}
            />
          </div>
          <DocumentView
            documents={pageDocuments}
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
LoadDocuments.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  pageDocuments: PropTypes.array.isRequired,
};
LoadDocuments.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    isDeleteSuccess: state.isDeleteSuccess,
    deleteError: state.deleteError,
    documents: state.documents,
    pageDocuments: state.pageDocuments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadDocuments);
