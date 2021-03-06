import React from 'react';
import { Row, Input } from 'react-materialize';
import { PropTypes } from 'react-proptypes';

const LoginForm = props => (
  <div className="section">
    <main>
      <center>
        <div className="section" />
        <div className="account">
          <a href="/register">Create account</a>
        </div>
        <h5 className="indigo-text">Please, login into your account</h5>
        <div className="section" />
        <div className="container">
          <div className="z-depth-1 grey lighten-4 rowdeck" >
            <Row>
              <Input
                id="email"
                s={12}
                type="email"
                label="Email"
                name="email"
                value={props.credentials.email}
                onChange={props.onChange}
              />
              {props.errors.email && <p className="error">{props.errors.email}</p>}
              <Input
                id="password"
                type="password"
                label="password"
                name="password"
                s={12}
                value={props.credentials.password}
                onChange={props.onChange}
              />
              {props.errors.password && <p className="error">{props.errors.password}</p>}
            </Row>
            <br />
          </div>
          <center>
            <div className="rowdeck">
              <button
                id="submit"
                type="submit"
                width="20px"
                name="btn_login"
                className="col s12 btn btn-large waves-effect indigo"
                onClick={props.onSave}
              >Login</button>
            </div>
          </center>
        </div>
      </center>
    </main>
  </div >
);
LoginForm.propTypes = {
  credentials: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
};
export default LoginForm;
