import React from 'react';
import { Row, Input } from 'react-materialize';
import { PropTypes } from 'react-proptypes';

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
                placeholder="Input title"
                s={6}
                label="Title"
                type="text"
                name="title"
                value={props.document.title}
                onChange={props.onChange}
              />
              <Input
                type="text"
                label="Content"
                name="content"
                s={12}
                value={props.document.content}
                onChange={props.onChange}
              />
              <Input
                s={12}
                type="select"
                label="Access"
                defaultValue="public"
                value={props.document.access}
                name="access"
                onChange={props.onChange}
              >
                <option value="public">public</option>
                <option value="private">private</option>
              </Input>
            </Row>
            <Row>
              <button
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
};

export default CreateDocument;
