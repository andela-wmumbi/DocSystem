const path = require('path');

module.exports = (app) => {
  // eslint-disable-next-line
  require('./user')(app);
  // eslint-disable-next-line
  require('./document')(app);
};
