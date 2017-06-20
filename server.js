import express from 'express';
import webpack from 'webpack';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import config from './webapck.config';

const routes = require('./server/routes');
const morgan = require('morgan');

const app = express();
dotenv.load();

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(morgan('dev'));
app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

/**
 * configure app to use bodyParser()
 * this will let us get the data from a POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; // set our port

const router = express.Router(); // get an instance of the express Router

// all of our routes will be prefixed with /api
app.use('/api', router);

routes(app);

// start the server
app.listen(port, () => {
  console.log('Server running at: ', port);
});
module.exports = app;
