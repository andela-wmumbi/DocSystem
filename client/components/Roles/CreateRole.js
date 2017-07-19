import React, { PropTypes } from 'react';
import { Row, Input } from 'react-materialize';

const CreateRole = props => (
  <div>
    <Row>
      <Input
        placeholder="Input title"
        s={12}
        label="Title"
        type="text"
        name="title"
        value={props.role.title}
        onChange={props.onChange}
      />
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
CreateRole.propTypes = {
  role: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default CreateRole;
