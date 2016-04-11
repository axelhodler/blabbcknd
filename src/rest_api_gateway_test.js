var td = require('testdouble');
var ledgerGatewayTd = td.replace('./ledger_gateway');
var api = require('./rest_api_gateway');
var LedgerEntry = require('./model/ledger_entry');

describe('rest api gateway', function() {
  it('gets all ledgerentries', function() {
    function Response(){};
    Response.prototype.send = function(){};
    var responseSpy = td.object(Response);
    var allLedgerEntriesStub = [
      new LedgerEntry('accountId', 22),
      new LedgerEntry('accountId2', 23)
    ];
    td.when(ledgerGatewayTd.allBalances()).thenReturn(allLedgerEntriesStub);

    var overview = api.getAll({}, responseSpy);

    td.verify(responseSpy.send(allLedgerEntriesStub));
  });
});