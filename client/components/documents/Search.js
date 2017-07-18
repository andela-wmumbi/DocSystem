import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-select/dist/react-select.css';
import * as documentActions from './../../actions/documentActions';
import SearchDisplay from './SearchDisplay';

class SearchDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isViewReady: false,
      documents: props.documents,
      searchdocument: props.searchdocument
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  handleChange(event) {
    const title = event.target.value;
    this.setState({ title });
  }
  handleSearch(title) {
    this.props.actions.searchDocument(title).then(() => {
      this.setState({ isViewReady: true });
    })
      .catch((error) => {
        throw (error);
      });
  }
  render() {
    const { isViewReady, searchdocument, title } = this.state;
    // const { isSearchError } = this.props;
    return (
      <div>
        <input
          name="form-field-name"
          value={this.state.titles}
          onChange={this.handleChange}
          placeholder="Search a document"
        />
        <button onClick={() => this.handleSearch(title)}>Search</button>
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
  documents: PropTypes.object.isRequired,
  searchdocument: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    searchdocument: state.searchdocument,
    isSearchError: state.isSearchError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchDocument);

