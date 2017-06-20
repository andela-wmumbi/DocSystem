import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './common/Home';
import About from './common/About';
import Header from './common/Header';
import Login from './auth/Login';
import Documents from './documents/Documents';
import RegisterPage from './register/RegisterForm';
import DocumentCreate from './documents/DocumentCreate';

const App = () => (
  <div className="container-fluid">
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/documents" component={Documents} />
          {/*<Route exact path="/register" component={RegisterPage} />*/}
          <Route exact path="/createdoc" component={DocumentCreate} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
    );
export default App;
