import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateRole from './CreateRole';
import * as RoleActions from './../../actions/roleActions';

class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: { title: '' }
    };
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    const field = event.target.name;
    const role = this.state.role;
    role[field] = event.target.value;
    this.setState({ role });
  }
  onSave() {
    this.props.actions.createRole(this.state.role).then(() => {
      this.context.router.history.push('/roles');
    });
  }

  render() {
    return (
      <CreateRole
        role={this.state.role}
        onSave={this.onSave}
        onChange={this.onChange}
      />
    );
  }
}
Roles.propTypes = {
  actions: PropTypes.object.isRequired
};
Roles.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RoleActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(Roles);
