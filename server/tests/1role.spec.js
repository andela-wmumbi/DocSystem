process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../server');
<<<<<<< HEAD
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
=======
const expect = require('chai').expect;
const should = chai.should();

chai.use(chaiHttp);
let token = null;
describe('create a token', () => {
  it('create a token', (done) => {
    const user = {
      email: 'admin@gmail.com',
      password: 'password',
    };
    chai.request(server)
      .post('/api/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        token = res.body.token;
        done();
      });
  });
});
describe('/api/roles', function () {
  this.timeout(5000);
  it('it should create a new role', (done) => {
    chai.request(server)
      .post('/api/roles')
      .set('x-access-token', token)
      .send({
        title: 'fellow'
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('it should not create a role if a field is missing', (done) => {
    const role = {};
    chai.request(server)
      .post('/api/roles')
      .set('x-access-token', token)
      .send(role)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should create a test role', (done) => {
    chai.request(server)
      .post('/api/roles')
      .set('x-access-token', token)
      .send({
        title: 'supervisor'
>>>>>>> 3d276948119e00cff4c1c6b6efc96cd6daa0d2a6
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
<<<<<<< HEAD
=======
  it('it should delete a test role', (done) => {
    chai.request(server)
      .delete('/api/roles/5')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should get all roles', (done) => {
    chai.request(server)
      .get('/api/roles')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
  it('shouldnot delete if role doesnot exist', (done) => {
    chai.request(server)
      .delete('/api/roles/12')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
>>>>>>> 3d276948119e00cff4c1c6b6efc96cd6daa0d2a6
});
