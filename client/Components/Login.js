import React from 'react';
import { Row, Input } from 'react-materialize';

const Login = () => (
  <div className="section">
    <main>
      <center>
        <div className="section" />
        <h5 className="indigo-text">Please, login into your account</h5>
        <div className="section" />
        <div className="container">
          <div className="z-depth-1 grey lighten-4 row" >
            <Row>
              <Input placeholder="Enter a user name" s={6} label="User Name" />
              <Input type="email" label="Email" s={12} />
              <Input type="password" label="password" s={12} />
            </Row>
            <br />
          </div>
          <center>
            <div className="row">
              <button type="submit" width="20px" name="btn_login" className="col s12 btn btn-large waves-effect indigo">Login</button>
            </div>
            <a href="/signup">Create account</a>
          </center>
        </div>
      </center>
    </main>
  </div>
);
export default Login;
