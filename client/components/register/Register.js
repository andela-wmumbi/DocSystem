import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import validateRegister from './Validate';
import * as userActions from './../../actions/UserActions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        roleTitle: 'owner'
      },
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.validate = this.validate.bind(this);
  }
  onChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({ user });
  }
  onSave(event) {
    event.preventDefault();
    if (this.validate()) {
      this.props.actions.registerUser(this.state.user).then(() => {
        this.context.router.history.push('/login');
      });
    }
  }
  validate() {
    const { errors, valid } = validateRegister(this.state.user);
    if (!valid) {
      this.setState({ errors });
    }
    return valid;
  }
  render() {
    return (
      <div>
        <RegisterForm
          onChange={this.onChange}
          onSave={this.onSave}
          user={this.state.user}
          errors={this.state.errors}
        />
      </div >
    );
  }
}
Register.propTypes = {
  actions: PropTypes.object.isRequired
};
Register.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    RegisterState: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
