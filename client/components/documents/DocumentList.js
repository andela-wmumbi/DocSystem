import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, CardPanel, Pagination, Button } from 'react-materialize';
import { bindActionCreators } from 'redux';
import * as documentActions from './../../actions/DocumentActions';

class DocumentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents
    };
    this.handleClick = this.handleClick.bind();
  }
  componentDidMount() {
    this.props.actions.loadDocuments();
  }

  componentWillReceiveProps(nextProps) {
    const { documents } = nextProps;
    if (documents !== this.state.documents) {
      this.setState({ documents });
    }
  }
  handleClick(key) {

  }
  render() {
    return (
      <div className="documents">
        <center>
          <Row>
            {this.state.documents.map(document =>
              (<Col s={12} m={5} key={document.id}>
                <CardPanel className="card">
                  <span> <h4>{document.title}</h4>
                    <p>{document.content}</p>
                    <a href="">EDIT</a>
                    <button onClick={this.handleClick(document.id)}></button>
                  </span>
                </CardPanel>
              </Col>)
            )}
          </Row>
          <Button
            floating
            large
            className="#1a237e indigo darken-4"
            waves="light"
            icon="add"
          />
          <Pagination items={8} activePage={2} maxButtons={6} />
        </center>
      </div>
    );
  }
}
DocumentList.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array,
};
DocumentList.contextTypes = {
  router: PropTypes.object.isRequired
};

DocumentList.defaultProps = {
  documents: []
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
