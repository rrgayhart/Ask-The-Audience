var expect = require('chai').expect;
var request = require('supertest');

var app = require('../server');

describe('GET /', function(){
  it('responds with success', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('default GET response', function(done){
  it('responds with page not found', function(done){
    request(app)
      .get('/fakeroute')
      .expect(404, done);
  });
});
