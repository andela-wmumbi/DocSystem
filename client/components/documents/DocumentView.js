import React from 'react';
import PropTypes from 'prop-types';
import { Row, CardPanel, Col } from 'react-materialize';
import UserDetails from './../../actions/userDetail';

const DocumentView = (props) => {
  const token = sessionStorage.getItem('token');
  const user = token && UserDetails.decodeToken(token);
  return (
    <div >
      <Row >
        {props.documents.length ? props.documents.map(document =>
          (<Col s={6} key={document.id} className="col">
            <CardPanel className="card">
              <span> <h5>{document.title}</h5>
                <p>{document.content}</p>
                <hr />
                {(document.userId === user.id || document.access === user.roleTitle) &&
                  <div>
                    <button onClick={() =>
                      props.openModal(document.id, document.content, document.title, document.userId)}
                    >
                      <i className="tiny material-icons">mode_edit</i>
                    </button>
                    <button onClick={() =>
                      props.deleteDocument(document.id)}
                    >
                      <i className="tiny material-icons">delete</i>
                    </button>
                  </div>
                }
              </span>
            </CardPanel>
          </Col>)
        ) :
          <span><h4>Create a document</h4></span>
        }
      </Row>
    </div>
  );
};
DocumentView.propTypes = {
  documents: PropTypes.array.isRequired
};

export default DocumentView;
