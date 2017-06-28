import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-select/dist/react-select.css';
import * as DocumentActions from './../../actions/DocumentActions';
import SearchDisplay from './../search/SearchDisplay';

class SearchDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [],
      isViewReady: false,
      documents: props.documents,
      searchdocument: props.searchdocument
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.getTitles = this.getTitles.bind(this);
  }
  componentDidMount() {
    this.props.actions.loadDocuments().then(() => {
      this.getTitles();
    });
  }
  componentWillReceiveProps(nextProps) {
    const { documents } = nextProps;
    if (documents !== this.state.documents) {
      this.setState({ documents });
    }
    const { searchdocument } = nextProps;
    if (searchdocument !== this.state.searchdocument) {
      this.setState({ searchdocument });
    }
  }
  getTitles() {
    const { documents } = this.state;
    const titles = [];
    documents.forEach((document) => {
      titles.push({ label: document.title, value: document.title });
    });
    this.setState({ titles });
  }
  handleSearch(title) {
    this.props.actions.searchDocument(title.value).then(() => {
      this.setState({ isViewReady: true });
    });
  }
  render() {
    const { isViewReady, searchdocument } = this.state;
    return (
      <div>
        <Select
          name="form-field-name"
          value={''}
          options={this.state.titles}
          onChange={this.handleSearch}
          placeholder="Search a document"
        />
        {isViewReady &&
          <SearchDisplay
            documents={searchdocument}
          />
        }
      </div>
    );
  }
}
SearchDocument.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  isViewReady: PropTypes.bool.isRequired,
  searchdocument: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    documents: state.documents,
    searchdocument: state.searchdocument
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchDocument);

