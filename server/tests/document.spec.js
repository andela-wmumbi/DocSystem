process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../server');
const userController = require('./../controllers/user');
const expect = require('chai').expect;
const should = chai.should();

const docs = {
  title: 'enzymes',
  content: 'They accelerate biochemical processes',
  access: 'public',
  id: 1,
};

chai.use(chaiHttp);

describe('/documents', () => {
  it('it should create a document', (done) => {
    chai.request(server)
      .post('/documents')
      .send(document)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('document');
        res.body.document.should.have.property('title').equal('enzymes');
        done();
      });
  });
});
