import React from 'react';
import { Row, CardPanel, Col } from 'react-materialize';

const UserDocuments = (props) => (
  <div className="documents">
    <Row>
      {
        props.documents.map(document =>
          (
            <center key={document.id}>
              <Col s={12} m={5}>
                <CardPanel>
                  <h4>{document.title}</h4>
                  <p>{document.content}</p>
                  <button
                    onClick={() =>
                      this.openModal(document.id, document.content, document.title)
                    }
                  >
                    EDIT
                  </button>
                  <button onClick={() => this.deleteDocument(document.id)}>DELETE</button>
                </CardPanel>
              </Col>
            </center>
          )
        )
      }
    </Row>
  </div>
);

export default UserDocuments;
