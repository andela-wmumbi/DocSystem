import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from './../actions/loginAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { credentials: { email: '', password: '' } };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({ credentials });
  }
  onSave(event) {
    event.preventDefault();
    this.props.actions.logInUser(this.state.credentials);
  }

  render() {
    return (
      <div className="section">
        <main>
          <center>
            <div className="section" />
            <h5 className="indigo-text">Please, login into your account</h5>
            <div className="section" />
            <div className="container">
              <div className="z-depth-1 grey lighten-4 row" >
                <Row>
                  <Input
                    type="email"
                    label="Email"
                    s={12}
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <Input
                    type="password"
                    label="password"
                    s={12}
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </Row>
                <br />
              </div>
              <center>
                <div className="row">
                  <button type="submit" width="20px" name="btn_login" className="col s12 btn btn-large waves-effect indigo" onClick={this.onSave}>Login</button>
                </div>
                <a href="/signup">Create account</a>
              </center>
            </div>
          </center>
        </main>
      </div >
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(Login);
