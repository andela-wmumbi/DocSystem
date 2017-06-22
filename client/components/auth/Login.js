import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import * as UserActions from './../../actions/UserActions';

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
    this.setState({ credentials });
  }
  onSave(event) {
    event.preventDefault();
    this.props.actions.logInUser(this.state.credentials).then(() => {
      this.context.router.history.push('/documents');
    });
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
  actions: PropTypes.object.isRequired
};
Login.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(Login);
