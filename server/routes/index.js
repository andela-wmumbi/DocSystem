const path = require('path');

module.exports = (app) => {
  // eslint-disable-next-line
  require('./users')(app);
  // eslint-disable-next-line
  require('./documents')(app);
};
