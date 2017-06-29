import React, { PropTypes } from 'react';
import { Row, CardPanel, Col } from 'react-materialize';

const SearchDisplay = props => (
  <div className="documents" >
    <div>
      <ul>
        <li>Username: {props.documents[0].username}</li>
        <li>Email: {props.documents[0].email}</li>
        <li>createdAt: {props.documents[0].createdAt}</li>
        <li>Role: {props.documents[0].roleId}</li>
      </ul>
    </div>
    <div><button onClick={props.deleteUser}>Delete user</button></div>
    <h5>Documents:</h5>
    <center >
      <Row>
        {props.documents[0].document.map(document =>
          (<Col s={12} m={5} key={document.id}>
            <CardPanel className="card">
              <span> <h4>{document.title}</h4>
                <p>{document.content}</p>
              </span>
            </CardPanel>
          </Col>)
        )}
      </Row>
    </center >
  </div >
);
SearchDisplay.propTypes = {
  documents: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
export default SearchDisplay;
