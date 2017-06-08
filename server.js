const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./server/routes');

const app = express();

/**
 * configure app to use bodyParser()
 * this will let us get the data from a POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; // set our port

const router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)

// all of our routes will be prefixed with /api
app.use('/api', router);

routes(app);

// start the server
app.listen(port);
console.log(`Magic happens on port ${port}`);
