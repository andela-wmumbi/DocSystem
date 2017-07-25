import React, { Component } from 'react';
import { PropTypes } from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateDocument from './CreateDocument';
import UserDetails from './../../actions/userDetails';
import * as documentActions from './../../actions/documentActions';

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: { title: '', content: '', access: '' },
      isEditing: false,
      role: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentWillMount() {
    const role = UserDetails.decodeToken(sessionStorage.token).roleTitle;
    this.setState({ role });
  }
  onChange(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    this.setState({ document });
  }
  onSave(event) {
    event.preventDefault();
    this.props.actions.createDocument(this.state.document).then(() => {
      this.context.router.history.push('/documents');
    });
  }
  render() {
    return (
      <div >
        <CreateDocument
          onChange={this.onChange}
          onSave={this.onSave}
          document={this.state.document}
          role={this.state.role}
        />
      </div >
    );
  }
}
Documents.propTypes = {
  actions: PropTypes.object.isRequired
};
Documents.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}
// connect function subscribes our container component to the store,
// so that it will be alerted when state changes
export default connect(null, mapDispatchToProps)(Documents);
