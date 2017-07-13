process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../server');

chai.use(chaiHttp);
describe('/api/signin', () => {
  xit('create a token', (done) => {
    const user = {
      email: 'example@gmail.com',
      password: '1234567',
    };
    chai.request(server)
      .post('/api/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        const token = res.body.token;
        done();
      });
  });
});
