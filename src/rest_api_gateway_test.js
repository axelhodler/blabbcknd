var ledgerGatewayTd = td.replace('./ledger_gateway');
var api = require('./rest_api_gateway');
var LedgerEntry = require('./model/ledger_entry');

describe('rest api gateway', function() {
  function Response(){};
  Response.prototype.send = function(){};
  var responseSpy;

  beforeEach(function() {
    responseSpy = td.object(Response);
  });

  it('gets all ledgerentries', function() {
    var allLedgerEntriesStub = [
      new LedgerEntry('ethereumAddress', 22),
      new LedgerEntry('accountId2', 23)
    ];
    td.when(ledgerGatewayTd.allBalances()).thenReturn(allLedgerEntriesStub);

    var overview = api.getAll({}, responseSpy);

    td.verify(responseSpy.send(allLedgerEntriesStub));
  });

  it('gets balance for accountid', function() {
    var requestStub = { params : { id:1 }};
    td.when(ledgerGatewayTd.balanceOf(1)).thenReturn(100);

    api.getBalanceFor(requestStub, responseSpy);

    td.verify(responseSpy.send(100));
  });
});