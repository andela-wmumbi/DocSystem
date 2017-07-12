import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RoleActions from './../../actions/roleActions';

class RoleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }
  componentDidMount() {
    this.props.actions.loadRoles();
  }
  render() {
    const { roles } = this.props
    return (
      <div> <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.title}</td>
              <td>
                {/*<button onClick={() =>
                  props.openModal(user.id, user.username, user.email)}
                >
                  <i className="tiny material-icons">mode_edit</i>
                </button>
                <button onClick={() =>
                  props.deleteUser(user.id)}
                >
                  <i className="tiny material-icons">delete</i>
                </button>*/}

              </td>
            </tr>
          ))
          }
        </tbody>
      </table>

      </div>
    );
  }
}
RoleList.propTypes = {
  actions: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
};
RoleList.contextTypes = {
  router: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    roles: state.roles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RoleActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RoleList);
