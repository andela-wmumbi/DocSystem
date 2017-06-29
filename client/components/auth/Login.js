import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import AlertContainer from 'react-alert';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import validateLogIn from './Validate';
import * as LoginActions from './../../actions/LoginActions';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: { email: '', password: '' },
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.validate = this.validate.bind(this);
  }
  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    this.setState({ credentials });
  }
  onSave(event) {
    event.preventDefault();
    if (this.validate()) {
      this.props.actions.logInUser(this.state.credentials).then(() => {
        this.context.router.history.push('/documents');
      }).catch(() => {
        this.setState({ error: 'Wrong email password combination' });
      });
    }
  }
  validate() {
    const { errors, valid } = validateLogIn(this.state.credentials);
    if (!valid) {
      this.setState({ errors });
    }
    return valid;
  }
  showAlert(error, mesg) {
    this.msg.show(mesg, {
      time: 5000,
      type: error,
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      transition: 'scale'
    });
  }
  render() {
    const { isLoginPending, isLoginSuccess, loginError } = this.props;
    return (
      <div >
        <LoginForm
          onChange={this.onChange}
          onSave={this.onSave}
          credentials={this.state.credentials}
          errors={this.state.errors}
        />
        <div className="message">
          {/* {isLoginPending &&}*/}
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          {isLoginSuccess && <div> {this.showAlert('success', 'Succesully logged in')}</div>}
          {loginError && <div> {this.showAlert('error', 'There was a problem logging in')}</div>}
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
