process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../../server');
const expect = require('chai').expect;

const should = chai.should();

chai.use(chaiHttp);
let token = null;
describe('/documents', function () {
  this.timeout(5000);
  before('create a token', (done) => {
    const user = {
      email: 'jim@gmail.com',
      password: 'password',
    };
    chai.request(server)
      .post('/api/signin')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  it('it should create a document', (done) => {
    const document = {
      title: 'enzymes',
      content: 'They accelerate biochemical processes',
      access: 'admin',
      userId: 1,
    };
    chai.request(server)
      .post('/api/documents')
      .set('x-access-token', token)
      .send(document)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('title').equal('enzymes');
        done();
      });
  });
  it('it should not create a document if a field is missing', (done) => {
    const document = {
      content: 'They accelerate biochemical processes',
    };
    chai.request(server)
      .post('/api/documents')
      .set('x-access-token', token)
      .send(document)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should get all documents', (done) => {
    chai.request(server)
      .get('/api/documents')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
  it('should get paginated documents', (done) => {
    const limit = 0;
    const offset = 0;
    chai.request(server)
      .get(`/api/documents?limit=${limit}&offset=${offset}`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });
  it('should get documents by access', (done) => {
    chai.request(server)
      .get('/api/roleDocuments?role=admin')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
  it('should not get document by access when it doesnt exist', (done) => {
    chai.request(server)
      .get('/api/roleDocuments?role=supervisor')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message).eql('Document not found');
        done();
      });
  });
});
describe('/api/documents/:id', () => {
  it('should get a document by id', (done) => {
    chai.request(server)
      .get('/api/documents/1')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should get no document if the id doesnot exist', (done) => {
    chai.request(server)
      .get('/api/documents/101')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
describe('/api/document:id', () => {
  it('should update a document by id', (done) => {
    chai.request(server)
      .put('/api/documents/1')
      .set('x-access-token', token)
      .send({
        title: 'tommy'
      })
      .end((err, res) => {
        res.should.have.status(202);
        expect(res.body.doc.title).eql('tommy');
        done();
      });
  });
  it('shouldnot update a document if it doenot exist', (done) => {
    chai.request(server)
      .put('/api/documents/101')
      .set('x-access-token', token)
      .send({
        title: 'tommy'
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
describe('/api/documents', function () {
  this.timeout(5000);
  beforeEach('it should create a test document', (done) => {
    const document = {
      title: 'jim',
      content: 'jimmy',
      access: 'public',
      userId: 1,
    };
    chai.request(server)
      .post('/api/documents')
      .set('x-access-token', token)
      .send(document)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should search for a document by title', (done) => {
    chai.request(server)
      .get('/search/documents?q=jim')
      .end((err, res) => {
        res.should.have.status(200);
        res.body[0].should.have.property('title').equal('jim');
        done();
      });
  });
  it('when document doesnot exist', (done) => {
    chai.request(server)
      .get('/search/documents?q=jiiiim')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('should delete a document', (done) => {
    chai.request(server)
      .delete('/api/documents/3')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
  it('shouldnot delete if document doesnot exist', (done) => {
    chai.request(server)
      .delete('/api/documents/40')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

