import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from './../../actions/UserActions';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.actions.logOutUser();
  }
  render() {
    return (
      <div>
        {this.context.router.history.push('/login')}
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
    actions: bindActionCreators(UserActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(Logout);
