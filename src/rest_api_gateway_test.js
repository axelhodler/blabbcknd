var ledgerGatewayTd = td.replace('./actions/read_ledger');
var authUser = td.replace('./actions/auth_user');
var api = require('./rest_api_gateway');
var LedgerEntry = require('./model/ledger_entry');
var Request = require('./boundaries/wrappers/request');
var Response = require('./boundaries/wrappers/response');

describe('rest api gateway', function() {
  var responseSpy,
    requestStub;

  beforeEach(function() {
    responseSpy = td.object(Response);
    requestStub = td.object(Request);
  });

  describe('ledger', function() {
    var stubInvalidToken = function() {
      td.when(authUser.isTokenValid('invalidToken')).thenReturn(false);
      td.when(requestStub.authorizationHeader()).thenReturn('invalidToken');
      return requestStub;
    };

    var stubValidToken = function() {
      td.when(authUser.isTokenValid('validToken')).thenReturn(true);
      td.when(requestStub.authorizationHeader()).thenReturn('validToken');
      return requestStub;
    };

    it('does not return ledger entries if token invalid', function() {
      var overview = api.getAll(stubInvalidToken(), responseSpy);

      td.verify(responseSpy.sendUnauthorized());
    });

    it('gets all ledgerentries', function() {
      var allLedgerEntriesStub = [
        new LedgerEntry('ethereumAddress', 22),
        new LedgerEntry('accountId2', 23)
      ];
      var requestStub = stubValidToken();
      td.when(ledgerGatewayTd.allBalances()).thenReturn(allLedgerEntriesStub);

      var overview = api.getAll(requestStub, responseSpy);

      td.verify(responseSpy.send(allLedgerEntriesStub));
    });

    it('does not return account balance if token invalid', function() {
      var requestStub = stubInvalidToken();

      api.getBalanceFor(requestStub, responseSpy);

      td.verify(responseSpy.sendUnauthorized());
    });

    it('gets balance for accountid', function() {
      var requestStub = stubValidToken();
      td.when(requestStub.idParam()).thenReturn(1);
      td.when(ledgerGatewayTd.balanceOf(1)).thenReturn(100);

      api.getBalanceFor(requestStub, responseSpy);

      td.verify(responseSpy.send(100));
    });
  });

  describe('auth', function() {
    it('can provide tokens to users', function() {
      td.when(requestStub.body()).thenReturn({ email: 'foo@bar.io', password: 'pw'});
      td.when(authUser.login(requestStub.body().email, requestStub.body().password))
        .thenReturn('validToken');

      api.login(requestStub, responseSpy);

      td.verify(responseSpy.send('validToken'));
    });
  });

});