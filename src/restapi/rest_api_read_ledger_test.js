var readLedgerTd = td.replace('./../actions/read_ledger');
var api = require('./rest_api_read_ledger');
var LedgerEntry = require('./../model/ledger_entry');
var Request = require('./../boundaries/delivery/request_wrapper');
var Response = require('./../boundaries/delivery/response_wrapper');

describe('ledger', function() {
  var responseSpy,
    requestStub;
  
  beforeEach(function() {
    responseSpy = td.object(Response);
    requestStub = td.object(Request);
  });

  it('gets all ledgerentries', function() {
    var allLedgerEntriesStub = [
      new LedgerEntry('ethereumAddress', 22),
      new LedgerEntry('accountId2', 23)
    ];
    td.when(readLedgerTd.allBalances()).thenReturn(allLedgerEntriesStub);

    var overview = api.getAll(requestStub, responseSpy);

    td.verify(responseSpy.send(allLedgerEntriesStub));
  });

  it('gets balance for accountid', function() {
    td.when(requestStub.idParam()).thenReturn(1);
    td.when(readLedgerTd.balanceOf(1)).thenReturn(100);

    api.getBalanceFor(requestStub, responseSpy);

    td.verify(responseSpy.send(100));
  });
});