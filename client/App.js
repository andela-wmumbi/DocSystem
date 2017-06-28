import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './common/Home';
import About from './common/About';
import HeaderView from './common/HeaderView';
import Header from './common/Header';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Documents from './documents/Documents';
import DocumentList from './documents/DocumentList';
import Register from './register/Register';
import Profile from './users/Profile';
import Search from './search/Search';

const App = () => (
  <div className="container-fluid">
    <BrowserRouter>
      <div>
        <HeaderView />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/documents" component={DocumentList} />
          <Route exact path="/documents/:id" component={DocumentList} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/createdoc" component={Documents} />
          <Route exact path="/mydocuments" component={Header} />
          <Route exact path="/myprofile" component={Profile} />
          <Route exact path="/displaysearch" component={Search} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);
export default App;
