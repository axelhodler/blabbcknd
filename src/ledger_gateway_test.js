var expect = require('chai').expect;
var td = require('testdouble');
var ledger_gateway = require('./ledger_gateway');
var ethereumGateway = require('./ethereum_gateway');

describe('ledger gateway', function() {
  it('provides balance for an account id', function() {
    var ethereumGatewayStub = td.object(ethereumGateway);
    td.when(ethereumGatewayStub.balanceOf('accountId')).thenReturn(1000);
    var ledgerGateway = ledger_gateway.create(ethereumGatewayStub);

    var ledgerEntry = ledgerGateway.balanceOf('accountId');

    expect(ledgerEntry.getAccountId()).to.equal('accountId');
    expect(ledgerEntry.getTokenAmount()).to.equal(1000);
  });
});
