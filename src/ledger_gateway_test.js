var expect = require('chai').expect;
var ethereumGatewayTd = td.replace('./boundaries/ethereum_gateway');
var accountGateway = td.replace('./boundaries/account_gateway');
var ledger_gateway = require('./ledger_gateway');

describe('ledger gateway', function() {
  it('provides balance for an account id', function() {
    td.when(accountGateway.fetchEthereumAddressFor('accountId')).thenReturn('ethereumAddress');
    td.when(ethereumGatewayTd.balanceOf('ethereumAddress')).thenReturn(1000);

    var ledgerEntry = ledger_gateway.balanceOf('accountId');

    expect(ledgerEntry.getEthereumAddress()).to.equal('ethereumAddress');
    expect(ledgerEntry.getTokenAmount()).to.equal(1000);
  });

  it('provides list of all ledgers', function() {
    td.when(accountGateway.fetchAllEtherAddresses()).thenReturn(['firstAddress', 'secondAddress']);
    td.when(ethereumGatewayTd.balanceOf('firstAddress')).thenReturn(28);
    td.when(ethereumGatewayTd.balanceOf('secondAddress')).thenReturn(36);

    var ledgerEntries = ledger_gateway.allBalances();

    expect(ledgerEntries.length).to.equal(2);
    expect(ledgerEntries[0].getTokenAmount()).to.equal(28);
    expect(ledgerEntries[1].getTokenAmount()).to.equal(36);
  });
});
