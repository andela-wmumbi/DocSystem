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
                id="username"
                label="UserName"
                type=""
                name="username"
                s={12}
                value={props.user.username}
                onChange={props.onChange}
              />
              {props.errors.username && <p className="error">{props.errors.username}</p>}
              <Input
                id="register-email"
                label="Email"
                type="email"
                name="email"
                s={12}
                value={props.user.email}
                onChange={props.onChange}
              />
              {props.errors.email && <p className="error">{props.errors.email}</p>}
              <Input
                id="register-password"
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
                id="register-submit"
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
<<<<<<< HEAD
  errors: PropTypes.object.isRequired,
=======
  errors: PropTypes.string.isRequired,
>>>>>>> 3d276948119e00cff4c1c6b6efc96cd6daa0d2a6
};
export default RegisterForm;
