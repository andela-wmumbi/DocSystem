import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Components/App';
import Home from './Components/Home';
import About from './Components/About';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
  </Route>
  );
