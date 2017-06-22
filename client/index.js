import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/App';
//import { loadDocuments } from './actions/documentActions';
import './../public/css/styles.css';

const store = configureStore();
//store.dispatch(loadDocuments());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app'));
