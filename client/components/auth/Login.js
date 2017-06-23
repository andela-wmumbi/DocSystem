import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import * as LoginActions from './../../actions/LoginActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { credentials: { email: '', password: '' }, };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    this.setState({ credentials });
  }
  onSave(event) {
    event.preventDefault();
    this.props.actions.logInUser(this.state.credentials).then(() => {
      this.context.router.history.push('/documents');
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    console.log(this.props.isLoginSuccess)
    const { isLoginPending, isLoginSuccess, loginError } = this.props;
    return (
      <div >
        {/* this.state.loginSuccess && <span>Invalid credentials</span>*/}
        <LoginForm
          onChange={this.onChange}
          onSave={this.onSave}
          credentials={this.state.credentials}
        />
        <div className="message">
          {isLoginPending && <div>Please wait...</div>}
          {isLoginSuccess && <div>Success.</div>}
          {loginError && <div>{loginError.message}</div>}
        </div>
      </div >
    );
  }
}
Login.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoginPending: PropTypes.bool.isRequired,
  isLoginSuccess: PropTypes.bool.isRequired,
  loginError: PropTypes.bool.isRequired
};
Login.contextTypes = {
  router: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    isLoginPending: state.loginReducer.isLoginPending,
    isLoginSuccess: state.loginReducer.isLoginSuccess,
    loginError: state.loginReducer.loginError
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoginActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
