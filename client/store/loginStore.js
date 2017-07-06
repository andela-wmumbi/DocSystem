import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './../reducers/loginReducer';

const store = createStore(reducer, {}, applyMiddleware(thunk, logger));
export default store;
