import React, { component } from 'react';
import ReactDOM from 'reactdom';
import './Components/Login';

class App extends React {
  render() {
    return (
      <Login />
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
