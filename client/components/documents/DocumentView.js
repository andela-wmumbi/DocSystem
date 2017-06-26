import React from 'react';
import { Row, CardPanel, Col } from 'react-materialize';

const UserDocuments = (props) => {
  <div className="documents">
    <center>
      <Row>
        {props.documents.map(document =>
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
        )}
      </Row>
    </center>
  </div>;
};

export default UserDocuments;
