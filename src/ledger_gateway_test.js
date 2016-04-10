var expect = require('chai').expect;
var td = require('testdouble');
var ethereumGatewayTd = td.replace('./ethereum_gateway');
var ledger_gateway = require('./ledger_gateway');

describe('ledger gateway', function() {
  it('provides balance for an account id', function() {
    td.when(ethereumGatewayTd.balanceOf('accountId')).thenReturn(1000);

    var ledgerEntry = ledger_gateway.balanceOf('accountId');

    expect(ledgerEntry.getAccountId()).to.equal('accountId');
    expect(ledgerEntry.getTokenAmount()).to.equal(1000);
  });
});
