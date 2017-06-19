import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Header from './Header';
import Login from './Login';
import Documents from './Documents';
import RegisterPage from './RegisterPage';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/documents" component={Documents} />
              <Route exact path="/register" component={RegisterPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
