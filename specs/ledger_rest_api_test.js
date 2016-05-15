var request = require('supertest');
var server = require('../src/boundaries/delivery/ledger_rest_api').start();

describe('Rest API', function () {
  var token;

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
        token = response.text;
        expect(token).to.contain('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9');
        done();
      });
  });

  var accountId;

  it('can read all ledger entries', function(done) {
    this.timeout(5000);
    request(server)
      .get('/ledgers')
      .set('Authorization', token)
      .expect(200)
      .end(function(error, response) {
        accountId = response.body[0];
        expect(response.body.length).to.equal(10);
        console.log(accountId);
        setTimeout(done, 5000);
        done();
      });
  });
});