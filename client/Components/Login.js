import React, { Component } from 'react';

class Login extends React {
  constructor(props) {
    super(props);
    this.state = {}

    this.handleClick = this.handleClick.bind();
  }

  handleClick(event) {

  }
  render() {
    return (
      <div>
        <Button onClick={this.handleClick()}>LOG IN</Button>
      </div>
    );
  }
}
export default Login;
