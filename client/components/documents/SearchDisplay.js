import React, { PropTypes } from 'react';
import { Row, CardPanel, Col } from 'react-materialize';

const SearchDisplay = props => (
  <div className="documents" >
    <center>
      <Row>
        {props.documents.length ? props.documents.map(document =>
          (<Col s={12} m={5} key={document.id}>
            <CardPanel className="card">
              <span> <h4>{document.title}</h4>
                <p>{document.content}</p>
                <button onClick={() =>
                  this.openModal(document.id, document.content, document.title)}
                >EDIT
                </button>
                <button onClick={() => this.deleteDocument(document.id)}>DELETE</button>
              </span>
            </CardPanel>
          </Col>)
        ) :
        <p>Document does not exist</p>
        }
      </Row>
    </center>
  </div >
);
SearchDisplay.propTypes = {
  documents: PropTypes.array,
  error: PropTypes.bool,
};

SearchDisplay.defaultProps = {
  documents: [],
  error: false,
};
export default SearchDisplay;
