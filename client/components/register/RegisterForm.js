import React from 'react';
import { Row, Input } from 'react-materialize';
import { PropTypes } from 'react-proptypes';

const RegisterForm = props => (
  <div>
    <Row>
      <Input
        placeholder="Placeholder"
        s={6}
        label="UserName"
        type="username"
        name="username"
        value={props.user.username}
        onChange={props.onChange}
      />
      <Input
        type="email"
        label="Email"
        name="email"
        s={12}
        value={props.user.email}
        onChange={props.onChange}
      />
      <Input
        type="password"
        label="password"
        name="password"
        s={12}
        value={props.user.password}
        onChange={props.onChange}
      />
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
RegisterForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default RegisterForm;
