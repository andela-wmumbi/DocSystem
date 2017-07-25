import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-select/dist/react-select.css';
import * as documentActions from './../../actions/documentActions';
import SearchDisplay from './SearchDisplay';

class SearchDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents,
      searchdocument: props.searchdocument
    };
  }

  componentDidMount() {
    const title = this.props.location.search.split('=')[1];
    this.props.actions.searchDocument(title);
  }

  render() {
    return (
      <div>
        <SearchDisplay
          documents={this.props.searchdocument}
        />
      </div>
    );
  }
}
SearchDocument.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  location: PropTypes.any.isRequired,
  searchdocument: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    isSearchError: state.isSearchError,
    searchdocument: state.searchdocument
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchDocument);

