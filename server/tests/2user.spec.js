process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../server');
const userController = require('./../controllers/user');
const expect = require('chai').expect;
const should = chai.should();
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic…5Nzh9.-xN0bTKw5pKzTSUyh0MNPAS05aZ_f7fmO1lJ1MN8e3Q';
describe('/api/users', () => {
  it('it should create a new user', (done) => {
    const user = {
      username: 'winnie',
      email: 'example@gmail.com',
      password: '1234567',
      roleId: 1
    };
    chai.request(server)
      .post('/api/users/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should list all users', (done) => {
    chai.request(server)
      .get('/api/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json();
        res.body.should.be.a('array');
        done();
      });
  });
});
describe('/user/:id', () => {
  it('should get a user by id', (done) => {
    chai.request(server)
      .get('/api/users/35')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
  });
});
//   it('should update a user by id', (done) => {
//     chai.request(server)
//       .put('/api/users/1')
//       .send({
//         email: 'jim@gmail.com'
//       })
//       .end((err, res) => {
//         res.should.have.status(200);
//         expect(res.body.email).eql('jim@gmail.com');
//         done();
//       });
//   });
//   it('should delete a user', (done) => {
//     chai.request(server)
//       .delete('/api/users/1')
//       .end((err, res) => {
//         res.should.have.status(200);
//         expect(res.body.message).eql('User deleted successfully.');
//         done();
//       });
//   });
// });
// describe('/logout', () => {
//   chai.request(server)
//     .post('/logout')
//     .end((err, res) => {
//       res.should.have.status(200);
//       expect(res.body.message).eql('User successfully logged out');
//     });
// });
