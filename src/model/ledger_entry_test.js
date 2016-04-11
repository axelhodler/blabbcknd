var expect = require('chai').expect;
var LedgerEntry = require('./ledger_entry');

describe('ledger entry', function() {
  var entry;

  beforeEach(function() {
    entry = new LedgerEntry('ethereumAddress', 1000);
  });

  it('holds ethereumAddress', function() {
    expect(entry.getEthereumAddress()).to.equal('ethereumAddress');
  });

  it('holds the amount of tokens the account owns', function() {
    expect(entry.getTokenAmount()).to.equal(1000);
  });
});