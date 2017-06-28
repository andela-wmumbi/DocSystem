import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Row, Col, CardPanel } from 'react-materialize';
import { connect } from 'react-redux';
import * as DocumentActions from './../../actions/DocumentActions';
import UserDetails from './../../actions/UserDetails';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents,
      showmyDocuments: false
    };
  }
  componentWillMount() {
    console.log('id', UserDetails.decodeToken(sessionStorage.token));
    this.props.actions.getUserDocuments(UserDetails.decodeToken(sessionStorage.token).id);
  }
  componentWillReceiveProps(nextProps) {
    const { documents } = nextProps;
    if (documents !== this.state.documents) {
      this.setState({ documents });
    }
  }
  render() {
    const { documents } = this.state;
    return (
      <div>
        <Row>
          {documents.map(document =>
            (<Col s={12} m={5} key={document.id}>
              <CardPanel className="card">
                <span> <h4>{document.title}</h4>
                  <p>{document.content}</p>
                  <button onClick={() =>
                    this.openModal(document.id, document.content, document.title)}
                  >
                    EDIT
                    </button>
                  <button onClick={() => this.deleteDocument(document.id)}>DELETE</button>
                </span>
              </CardPanel>
            </Col>)
          )}
        </Row>
      </div>
    );
  }
}
Header.propTypes = {
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
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
