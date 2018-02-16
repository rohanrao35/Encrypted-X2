var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');

const userCredentials = {
  email: 'rao46@purdue.edu',
  password: ''
}

var authenticatedUser = request.agent(app);

before(function(done){
  authenticatedUser
  .post('/login/')
  .send(userCredentials)
  .end(function(err, response){
    expect(response.statusCode).to.equal(200);
    done();
  });
});

describe('Post /login/', function(done){

  it('it should return a response 200 since user should be able to login',
   function(done){
     authenticatedUser(app).get('/..main/main.html')
     .expect(200, done);
  });


});
