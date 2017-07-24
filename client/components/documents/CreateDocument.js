import React from 'react';
import { Row, Input } from 'react-materialize';
import PropTypes from 'prop-types';

const CreateDocument = props => (
  <div className="section">
    <main>
      <center>
        <div className="section" />
        <h5 className="indigo-text">Create a document</h5>
        <div className="section" />
        <div className="container">
          <div className="z-depth-1 grey lighten-4 rowdeck" >
            <Row>
              <Input
                id="title"
                placeholder="Input title"
                s={12}
                label="Title"
                type="text"
                name="title"
                value={props.document.title}
                onChange={props.onChange}
              />
              <Input
                id="content"
                type="text"
                label="Content"
                name="content"
                s={12}
                value={props.document.content}
                onChange={props.onChange}
              />
              <Input
                id="access"
                s={12}
                type="select"
                label="Access"
                defaultValue="public"
                value={props.document.access}
                name="access"
                onChange={props.onChange}
              >
              <option value="">Choose an option</option>
               <option value="public">public</option>
                <option value="private">private</option>
                <option value={props.role}>role</option>
              </Input>
            </Row>
            <Row>
              <button
                id="document-submit"
                type="submit"
                width="20px"
                label="login"
                name="btn_login"
                className="col s12 btn btn-large waves-effect indigo"
                onClick={props.onSave}
              >Submit</button>
            </Row>
          </div>
        </div>
      </center>
    </main>
  </div >
);
CreateDocument.propTypes = {
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  role: PropTypes.any.isRequired,
};

export default CreateDocument;
