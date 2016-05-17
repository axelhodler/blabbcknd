var request = require('supertest');

var server = require('../src/boundaries/delivery/ledger_rest_api').start();

describe('Rest API', function () {
  var token;

  before(function(done) {
    this.timeout(4000);
    require('../src/boundaries/blockchain/web3_setup')().then(function() {
      done();
    });
  });

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

  var ownerAccountId,
    secondAccountId;

  it('can read all ledger entries', function(done) {
    this.timeout(5000);
    request(server)
      .get('/ledgers')
      .set('Authorization', token)
      .expect(200)
      .end(function(error, response) {
        ownerAccountId = response.body[0].ethereumAddress;
        secondAccountId = response.body[1].ethereumAddress;
        expect(response.body[0].tokenAmount).to.equal('10000');
        expect(response.body.length).to.equal(10);
        done();
      });
  });

  it('can send tokens from one account to another', function(done) {
    request(server)
      .post('/transactions')
      .set('Authorization', token)
      .send(
        {
          to: secondAccountId,
          amount: 5000
        }
      )
      .expect(201)
      .end(function (error, response) {
        done();
      });
  });

  it('tokens can be exchanged to euros', function(done) {
    request(server)
      .post('/exchange')
      .set('Authorization', token)
      .send(
        {
          amount: 50,
          recipient: ownerAccountId
        }
      )
      .expect(201)
      .end(function (error, response) {
        done();
      });
  });

  it('can read single ledger entry', function(done) {
    request(server)
      .get('/ledgers/' + ownerAccountId)
      .set('Authorization', token)
      .expect(200)
      .end(function (error, response) {
        expect(response.body.tokenAmount).to.equal('4950');
        done();
      });
  });

});