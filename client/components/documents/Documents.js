import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentList from './DocumentList';
import * as documentActions from './../../actions/documentActions';

class Documents extends Component {
  render() {
    return (
      <div>
        <DocumentList documents={this.props.documents} />
      </div>
    );
  }
}
Document.propTypes = {
  documents: PropTypes.array.isRequired
};
function mapStateToProps(state, ownprops) {
  return {
    documents: state.documents
  };
}
// connect function subscribes our container component to the store,
// so that it will be alerted when state changes
export default connect(mapStateToProps)(Documents);
