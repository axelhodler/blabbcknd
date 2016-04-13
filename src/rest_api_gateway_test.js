var ledgerGatewayTd = td.replace('./ledger_gateway');
var authUser = td.replace('./auth_user');
var api = require('./rest_api_gateway');
var LedgerEntry = require('./model/ledger_entry');

describe('rest api gateway', function() {
  function Response(){};
  Response.prototype.send = function(){};
  Response.prototype.status = function(){};
  var responseSpy;

  beforeEach(function() {
    responseSpy = td.object(Response);
  });

  describe('ledger', function() {
    var stubbedTokenHeader = function(value) {
      return {
        get : function(header) {
          if (header === 'Authorization') {
            return value;
          }
        }
      };
    };

    it('does not return ledger entries if token invalid', function() {
      td.when(authUser.isTokenValid('invalidToken')).thenReturn(false);
      var requestStub = stubbedTokenHeader('invalidToken');

      var overview = api.getAll(requestStub, responseSpy);

      td.verify(responseSpy.status(401));
    });

    it('gets all ledgerentries', function() {
      var allLedgerEntriesStub = [
        new LedgerEntry('ethereumAddress', 22),
        new LedgerEntry('accountId2', 23)
      ];
      td.when(authUser.isTokenValid('validToken')).thenReturn(true);
      var requestStub = stubbedTokenHeader('validToken');
      td.when(ledgerGatewayTd.allBalances()).thenReturn(allLedgerEntriesStub);

      var overview = api.getAll(requestStub, responseSpy);

      td.verify(responseSpy.send(allLedgerEntriesStub));
    });

    it('does not return account balance if token invalid', function() {
      td.when(authUser.isTokenValid('invalidToken')).thenReturn(false);
      var requestStub = stubbedTokenHeader('invalidToken');

      api.getBalanceFor(requestStub, responseSpy);

      td.verify(responseSpy.status(401));
    });

    it('gets balance for accountid', function() {
      td.when(authUser.isTokenValid('validToken')).thenReturn(true);
      var requestStub = stubbedTokenHeader('validToken');
      requestStub.params = {id: 1};
      td.when(ledgerGatewayTd.balanceOf(1)).thenReturn(100);

      api.getBalanceFor(requestStub, responseSpy);

      td.verify(responseSpy.send(100));
    });
  });

  describe('auth', function() {
    it('can provide tokens to users', function() {
      var requestStub = { body: { email: 'foo@bar.io', password: 'pw'}};
      td.when(authUser.login(requestStub.body.email, requestStub.body.password)).thenReturn('validToken');

      api.login(requestStub, responseSpy);

      td.verify(responseSpy.send('validToken'));
    });
  });

});