import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './common/Home';
import About from './common/About';
import HeaderView from './common/HeaderView';
import Header from './common/Header';
import Login from './auth/Login';
import Logout from './auth/Logout';
import CreateDocument from './documents/Documents';
import LoadDocuments from './documents/LoadDocuments';
import Register from './register/Register';
import Users from './users/Users';
import RolesList from './Roles/RolesList';
import SearchDocument from './documents/SearchDocument';
import RoleDocuments from './Roles/RoleDocuments';

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
          <Route exact path="/documents" component={LoadDocuments} />
          <Route exact path="/documents/:id" component={LoadDocuments} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/createdoc" component={CreateDocument} />
          <Route exact path="/mydocuments" component={Header} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/roles" component={RolesList} />
          <Route exact path="/roleDocuments" component={RoleDocuments} />
          <Route exact path="/documents-search" component={SearchDocument} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);
export default App;
