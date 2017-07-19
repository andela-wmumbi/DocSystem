import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import { Button } from 'react-materialize';
import * as RoleActions from './../../actions/roleActions';

class RoleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRole: {
        id: '',
        title: '',
      },
      isEdit: false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreateDoc = this.handleCreateDoc.bind(this);
  }
  componentDidMount() {
    this.props.actions.loadRoles();
  }
  handleChange(event, id) {
    const title = event.target.value;
    this.setState({ newRole: { id, title } });
  }
  handleEdit() {
    this.setState({ isEdit: true });
  }
  handleDelete(id) {
    this.props.actions.deleteRole(id)
    .then(() => {
      toastr.success('Role deleted succesfully');
    })
      .catch(() => {
        toastr.success('Couldnot delete role');
      });
  }
  handleCreateDoc() {
    this.context.router.history.push('/createrole');
  }
  render() {
    const { roles } = this.props;
    return (
      <div>
        <center>
          <table className="centered">
            <thead>
              <tr>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map(role => (
                <tr key={role.id}>
                  <td>
                    {role.title}
                  </td>
                  <td>
                    <button onClick={() => this.handleDelete(role.id)}>
                      <i className="tiny material-icons">delete</i>
                    </button>
                  </td>
                </tr>
          ))
          }
              <Button
                floating
                className="#1a237e indigo darken-4"
                waves="light"
                icon="add"
                onClick={() => this.handleCreateDoc()}
              />
            </tbody>
          </table>
        </center>
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
