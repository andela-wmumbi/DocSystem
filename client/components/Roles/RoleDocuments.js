import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserDetails from './../../actions/userDetails';
import * as documentActions from './../../actions/documentActions';
import DocumentView from './../documents/DocumentView';

class RoleDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const role = UserDetails.decodeToken(sessionStorage.token).roleTitle;
    this.props.actions.loadRoleDocuments(role);
  }
  render() {
    const { documents } = this.props;
    return (
      <div>
        <DocumentView
          documents={documents}
        />
      </div>
    );
  }
}
RoleDocuments.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired
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
