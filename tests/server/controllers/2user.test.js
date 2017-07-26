process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../../server');
const expect = require('chai').expect;

chai.use(chaiHttp);
let token = null;
describe('/api/users', function () {
  this.timeout(5000);
  it('it should create a new user', (done) => {
    const user = {
      username: 'winnie',
      email: 'example@gmail.com',
      password: '1234567',
      roleTitle: 'admin'
    };
    chai.request(server)
      .post('/api/users/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('it should not create a user if a field is missing', (done) => {
    const user = {
      email: 'example@gmail.com',
      password: '1234567',
      roleTitle: 'admin'
    };
    chai.request(server)
      .post('/api/users/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should get all users', (done) => {
    chai.request(server)
      .get('/api/users')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});
describe('/api/signin', function () {
  this.timeout(5000);
  it('create a token', (done) => {
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
        token = res.body.token;
        done();
      });
  });
  it('should not signin when user doesnot exist', (done) => {
    const user = {
      email: 'ex@gmail.com',
      password: '1234567',
    };
    chai.request(server)
      .post('/api/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('should not signin when password is wrong', (done) => {
    const user = {
      email: 'example@gmail.com',
      password: '12347',
    };
    chai.request(server)
      .post('/api/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
describe('/api/users', () => {
  it('should get all users', (done) => {
    chai.request(server)
      .get('/api/users')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
  it('should get paginated users', (done) => {
    const limit = 1;
    const offset = 0;
    chai.request(server)
      .get(`/api/users?limit=${limit}&offset=${offset}`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
  });
});
describe('/api/users/:id', () => {
  it('should get a user by id', (done) => {
    chai.request(server)
      .get('/api/users/1')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('user doesnot exist', (done) => {
    chai.request(server)
      .get('/api/users/101')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
describe('/users/:userId/documents', () => {
  it('should get a user documents', (done) => {
    chai.request(server)
      .get('/users/1/documents')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.to.be.a('array');
        done();
      });
  });
  it('should not get documents of non-existing user', (done) => {
    chai.request(server)
      .get('/users/101/documents')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
describe('/api/users/:id', () => {
  it('should update a user by id', (done) => {
    chai.request(server)
      .put('/api/users/1')
      .set('x-access-token', token)
      .send({
        email: 'jim@gmail.com'
      })
      .end((err, res) => {
        res.should.have.status(202);
        expect(res.body.email).eql('jim@gmail.com');
        done();
      });
  });
  it('shouldnot update a user if they do not exist', (done) => {
    chai.request(server)
      .put('/api/users/11')
      .set('x-access-token', token)
      .send({
        email: 'yoh@gmail.com'
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('/api/users', function () {
  this.timeout(5000);
  it('it should create a test user', (done) => {
    const user = {
      username: 'tim',
      email: 'timee@gmail.com',
      password: '1234567890',
      roleTitle: 'admin',
    };
    chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should search for a user by username', (done) => {
    chai.request(server)
      .get('/search/users?name=tim')
      .end((err, res) => {
        res.should.have.status(200);
        res.body[0].should.have.property('username').equal('tim');
        done();
      });
  });
  xit('should delete a the user', (done) => {
    this.timeout(5000);
    setTimeout(done, 5000);
    chai.request(server)
      .delete('/api/users/3')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
  it('shouldnot delete if user doesnot exist', (done) => {
    chai.request(server)
      .delete('/api/users/40')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
describe('/api/logout', () => {
  it('should logout user', (done) => {
    chai.request(server)
      .post('/api/logout')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body.message).eql('User successfully logged out');
        done();
      });
  });
});
