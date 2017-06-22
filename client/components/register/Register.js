import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import * as UserActions from './../../actions/UserActions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { user: { username: '', email: '', password: '', id: 1 } };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({ user });
  }
  onSave(event) {
    event.preventDefault();
    this.props.actions.registerUser(this.state.user).then(() => {
      this.context.router.history.push('/createdoc');
    });
  }
  render() {
    return (
      <div >
        {/* {this.state.user && <Redirect to="/documents" />}*/}
        <RegisterForm
          onChange={this.onChange}
          onSave={this.onSave}
          user={this.state.user}
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
    actions: bindActionCreators(UserActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(Register);
