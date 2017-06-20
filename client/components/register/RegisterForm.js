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
        type="email"
        value={props.user.email}
        onChange={props.onChange}
      />
      <Input
        type="email"
        label="Email"
        s={12}
        value={props.password}
        onChange={props.onChange}
      />
      <Input
        type="password"
        label="password"
        s={12}
        value={props.password}
        onChange={props.onChange}
      />
    </Row>
    <Row>
      <button>Submit</button>
    </Row>
  </div>
);
RegisterForm.propTypes = {
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
export default RegisterForm;
