import React, { Router, browserHistory } from 'react';
import ReactDOM from 'react-dom';
import routes from './../server/routes/index';

ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('app'));
