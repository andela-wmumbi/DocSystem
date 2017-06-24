import React, { Component } from 'react';
import { PropTypes } from 'react-proptypes';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
import { bindActionCreators } from 'redux';
import CreateDocument from './DocumentCreate';
import * as documentActions from './../../actions/DocumentActions';

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: { title: '', content: '', access: '' },
      isEditing: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
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
        />
      </div >
    );
  }
}
Documents.propTypes = {
  actions: PropTypes.func.isRequired
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
