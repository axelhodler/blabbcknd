var request = require('supertest');
var server = require('../src/boundaries/delivery/ledger_rest_api').start();

describe('Rest API', function () {
  it('receives token with valid credentials', function (done) {
    request(server)
      .post('/auth')
      .send(
        {
          email : "mail0@test.com",
          password: "pw0"
        }
      )
      .expect(200)
      .end(function(error, response) {
        expect(response.text).to.contain('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9');
        done();
      });
  });
});