import React, { Component, PropTypes } from 'react';
import { loadDocuments } from './../../actions/DocumentActions';
import configureStore from './../../store/configureStore';

const store = configureStore();

class DocumentList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    store.dispatch(loadDocuments());
  }
  render() {
    return (
      <ul >
        l
        {/*{
          documents.map(document =>
            <li> {document.title}</li>
          )
        }*/}
      </ul >
    );
  }
}
DocumentList.propTypes = {
  actions: PropTypes.object.isRequired
};
export default DocumentList;
