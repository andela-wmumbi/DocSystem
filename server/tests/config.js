require('babel-register');
require('./setup');

exports.config = {
  framework: 'enzyme',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:3000',
  specs: ['e2e/**/*.js'],
  onPrepare: () => {
    browser.ignoreSynchronization = true;
    const width = 2250;
    const height = 1200;
    browser.driver.manage().window().setSize(width, height);
  },
  mochaOpts: {
    enableTimeouts: false,
  },
  allScriptsTimeout: 15000,
};
