import React from 'react';
import { Row, Input } from 'react-materialize';
import { PropTypes } from 'react-proptypes';

const RegisterForm = props => (
  <div className="section">
    <main>
      <center>
        <div className="section" />
        <h5 className="indigo-text">Create your account</h5>
        <div className="section" />
        <div className="container">
          <div className="z-depth-1 grey lighten-4 rowdeck" >
            <Row>
              <Input
                label="UserName"
                type=""
                name="username"
                s={12}
                value={props.user.username}
                onChange={props.onChange}
              />
              {props.errors.username && <p className="error">{props.errors.username}</p>}
              <Input
                label="Email"
                type="email"
                name="email"
                s={12}
                value={props.user.email}
                onChange={props.onChange}
              />
              {props.errors.email && <p className="error">{props.errors.email}</p>}
              <Input
                type="password"
                label="password"
                name="password"
                s={12}
                value={props.user.password}
                onChange={props.onChange}
              />
              {props.errors.password && <p className="error">{props.errors.password}</p>}
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
RegisterForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.string.isRequired,
};
export default RegisterForm;
