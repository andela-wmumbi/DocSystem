import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import validateLogIn from './Validate';
import * as loginActions from './../../actions/loginActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: { email: '', password: '' },
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
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
