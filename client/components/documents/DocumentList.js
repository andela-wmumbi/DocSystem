import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';
import AlertContainer from 'react-alert';
import { Button } from 'react-materialize';
import Pagination from 'react-js-pagination';
import Update from './Update';
import AllDocuments from './AllDocuments';
import * as documentActions from './../../actions/documentActions';


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
    this.showAlert = this.showAlert.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
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
  handleCreateDoc() {
    this.context.router.history.push('/createdoc');
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.paginateDocuments(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }
  showAlert(error, mesg) {
    this.msg.show(mesg, {
      time: 5000,
      type: error,
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      transition: 'scale'
    });
  }
  render() {
    const { documentContent, documents } = this.state;
    const { pageDocuments, isDeleteSuccess, deleteError } = this.props;
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
          <div className="message">
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            {isDeleteSuccess && <div> {this.showAlert('success', 'Document Succesully deleted')}</div>}
            {deleteError && <div> {this.showAlert('error', 'There was a problem deleting')}</div>}
          </div>
        </center >
      </div >
    );
  }
}
DocumentList.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.object.isRequired,
  pageDocuments: PropTypes.array.isRequired,
  // isDeleteSuccess: PropTypes.bool.isRequired,
  // deleteError: PropTypes.bool.isRequired
};
DocumentList.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
