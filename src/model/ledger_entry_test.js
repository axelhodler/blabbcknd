var expect = require('chai').expect;
var LedgerEntry = require('./ledger_entry');

describe('ledger entry', function() {
  var entry;

  beforeEach(function() {
    entry = new LedgerEntry('accountId', 1000);
  });

  it('holds accountId', function() {
    expect(entry.getAccountId()).to.equal('accountId');
  });

  it('holds the amount of tokens the account owns', function() {
    expect(entry.getTokenAmount()).to.equal(1000);
  });
});