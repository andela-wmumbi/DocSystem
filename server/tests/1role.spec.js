process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../server');
const roleController = require('./../controllers/role');
const expect = require('chai').expect;
const should = chai.should();
chai.use(chaiHttp);

describe('/api/roles', () => {
  it('it should create a new role', (done) => {
    chai.request(server)
      .post('/api/roles')
      .send({
        title: 'admin'
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});
