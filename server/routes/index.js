module.exports = (app) => {
  // eslint-disable-next-line
  require('./user')(app);
  // eslint-disable-next-line
  require('./document')(app);
  require('./role')(app);
};
