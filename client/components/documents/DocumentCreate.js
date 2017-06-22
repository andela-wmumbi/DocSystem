import React from 'react';
import { Row, Input } from 'react-materialize';
import { PropTypes } from 'react-proptypes';

const CreateDocument = props => (
  <div>
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
        defaultValue="Public"
        value={props.document.access}
        name="access"
        onChange={props.onChange}
      >
        <option value="Public">Public</option>
        <option value="Private">Private</option>
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
);
CreateDocument.propTypes = {
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
};

export default CreateDocument;
