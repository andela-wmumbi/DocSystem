const webdriver = require('selenium-webdriver');
require('chromedriver');

const By = webdriver.By;
const until = webdriver.until;

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

describe('login form', function () {
  this.timeout(50000);
  before((done) => {
    driver.navigate().to('http://localhost:3000')
      .then(() => done());
  });

  it('registers a user', (done) => {
    driver.findElement(By.css('.account')).click();
    driver.findElement(By.css('#username')).sendKeys('tom');
    driver.findElement(By.css('#register-email')).sendKeys('tom@gmail.com');
    driver.findElement(By.css('#register-password')).sendKeys('123456');
    driver.findElement(By.css('#register-submit')).click()
      .then(() => done());
  });
  it('logs in a user', (done) => {
    driver.wait(until.elementLocated(By.css('#email')));
    driver.findElement(By.css('#email')).sendKeys('tom@gmail.com');
    driver.findElement(By.css('#password')).sendKeys('123456');
    driver.findElement(By.css('#submit')).click()
      .then(() => done());
  });
  it('creates a document', (done) => {
    driver.wait(until.elementLocated(By.css('#create')));
    driver.findElement(By.css('#create')).click();
    driver.findElement(By.css('#title')).sendKeys('Yeah');
    driver.findElement(By.css('#content')).sendKeys('I made it!');
    driver.findElement(By.css('#access')).sendKeys('public');
    driver.findElement(By.css('#document-submit')).click()
      .then(() => done());
  });
  it('logs out a user', (done) => {
    driver.findElement(By.css('.nav-items2')).click()
      .then(() => done());
  });

  after((done) => {
    driver.quit()
      .then(() => done());
  });
});
