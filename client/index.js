import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
//import { subreddit } from './reducers/redditReducer.js';
import App from './components/App';


//const store = createStore(subreddit, applyMiddleware(thunk));

ReactDOM.render(<App />
, document.getElementById('app'));
