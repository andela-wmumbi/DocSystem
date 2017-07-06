import React from 'react';
import { Row, CardPanel, Col } from 'react-materialize';

const AllDocuments = (props) => (
  <div >
    <Row >
      {props.documents.map(document =>
        (<Col s={6} key={document.id} className="col">
          <CardPanel className="card">
            <span> <h5>{document.title}</h5>
              <p>{document.content}</p>
              <hr />
              <button onClick={() =>
                props.openModal(document.id, document.content, document.title)}
              >
                <i className="small material-icons">mode_edit</i>
              </button>
              <button onClick={() =>
                props.deleteDocument(document.id)}
              >
                <i className="small material-icons">delete</i>
              </button>
            </span>
          </CardPanel>
        </Col>)
      )}
    </Row>
  </div>
);

export default AllDocuments;
