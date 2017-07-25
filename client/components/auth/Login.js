import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import AlertContainer from 'react-alert';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import validateLogIn from './Validate';
<<<<<<< HEAD
import * as LoginActions from './../../actions/LoginActions';

=======
import * as loginActions from './../../actions/loginActions';
>>>>>>> 3d276948119e00cff4c1c6b6efc96cd6daa0d2a6

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: { email: '', password: '' },
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
<<<<<<< HEAD
    this.showAlert = this.showAlert.bind(this);
=======
>>>>>>> 3d276948119e00cff4c1c6b6efc96cd6daa0d2a6
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
  render() {
    return (
      <div>
        <LoginForm
          onChange={this.onChange}
          onSave={this.onSave}
          credentials={this.state.credentials}
          errors={this.state.errors}
        />
      </div >
    );
  }
}
Login.propTypes = {
  actions: PropTypes.object.isRequired,
};
Login.contextTypes = {
  router: PropTypes.object.isRequired
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(Login);
