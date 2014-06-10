process.env.NODE_ENV = 'test';

var app = require('../web');
var request = require('supertest');
var assert = require('assert');

var fs = require('fs');


describe('GET /api/maxim/titles', function() {

  it('should respond with json', function(done) {
    request(app)
    .get('/api/maxim/titles')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET /api/maxim/:from/thru/:to', function() {

  it('should respond with json', function(done) {
    request(app)
    .get('/api/maxim/1/thru/3')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});