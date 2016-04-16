var readLedgerTd = td.replace('./actions/read_ledger');
var authUser = td.replace('./actions/auth_user');
var api = require('./rest_api_read_ledger');
var LedgerEntry = require('./model/ledger_entry');
var Request = require('./boundaries/wrappers/request');
var Response = require('./boundaries/wrappers/response');

describe('ledger', function() {
  var responseSpy,
    requestStub;
  
  beforeEach(function() {
    responseSpy = td.object(Response);
    requestStub = td.object(Request);
  });

  it('does not return ledger entries if token invalid', function() {
    var overview = api.getAll(stubInvalidToken(requestStub, authUser), responseSpy);

    td.verify(responseSpy.sendUnauthorized());
  });

  it('gets all ledgerentries', function() {
    var allLedgerEntriesStub = [
      new LedgerEntry('ethereumAddress', 22),
      new LedgerEntry('accountId2', 23)
    ];
    td.when(readLedgerTd.allBalances()).thenReturn(allLedgerEntriesStub);

    var overview = api.getAll(stubValidToken(requestStub, authUser), responseSpy);

    td.verify(responseSpy.send(allLedgerEntriesStub));
  });

  it('does not return account balance if token invalid', function() {
    api.getBalanceFor(stubInvalidToken(requestStub, authUser), responseSpy);

    td.verify(responseSpy.sendUnauthorized());
  });

  it('gets balance for accountid', function() {
    var stubbedRequest = stubValidToken(requestStub, authUser);
    td.when(stubbedRequest.idParam()).thenReturn(1);
    td.when(readLedgerTd.balanceOf(1)).thenReturn(100);

    api.getBalanceFor(stubbedRequest, responseSpy);

    td.verify(responseSpy.send(100));
  });
});