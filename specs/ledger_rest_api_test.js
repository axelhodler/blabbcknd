var request = require('supertest');
require('../src/boundaries/blockchain/web3_setup').setup();
var server = require('../src/boundaries/delivery/ledger_rest_api').start();

describe('Rest API', function () {
  var token;

  it('receives token with valid credentials', function (done) {
    this.timeout(4000);
    setTimeout(function(){
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
        setTimeout(done, 4000);
        done();
      });
    }, 3000);
  });

  var accountId,
    expectedAmount;

  it('can read all ledger entries', function(done) {
    this.timeout(5000);
    request(server)
      .get('/ledgers')
      .set('Authorization', token)
      .expect(200)
      .end(function(error, response) {
        accountId = response.body[0].ethereumAddress;
        expectedAmount = response.body[0].tokenAmount;
        expect(response.body.length).to.equal(10);
        setTimeout(done, 5000);
        done();
      });
  });

  it('can read single ledger entry', function(done) {
    request(server)
      .get('/ledgers/' + accountId)
      .set('Authorization', token)
      .expect(200)
      .end(function (error, response) {
        expect(response.body.tokenAmount).to.equal(expectedAmount);
        done();
      })
  })
});