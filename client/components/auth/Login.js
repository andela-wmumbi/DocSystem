import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import * as loginActions from './../../actions/loginAction';

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
    credentials[field] = event.target.value;
    this.setState({ credentials: this.state.credentials });
  }
  onSave(event) {
    event.preventDefault();
    this.props.actions.logInUser(this.state.credentials);
  }

  render() {
    return (
      <div>
        {/* this.state.loginSuccess && <span>Invalid credentials</span>*/}
        <LoginForm
          onChange={this.onChange}
          onSave={this.onSave}
          credentials={this.state.credentials}
        />
      </div>
    );
  }
}
Login.propTypes = {
  actions: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(Login);
