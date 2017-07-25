import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './../../actions/UserActions';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.redirect = this.redirect.bind(this);
  }
  componentDidMount() {
    this.props.actions.logOutUser();
  }
  redirect() {
    this.context.router.history.push('/login');
  }
  render() {
    return (
      <div>
        {this.redirect()}
      </div>
    );
  }
}
Logout.propTypes = {
  actions: PropTypes.object.isRequired
};
Logout.contextTypes = {
  router: PropTypes.object.isRequired
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(Logout);
