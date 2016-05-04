var Ownership = require('./ownership');
var LedgerEntry = require('./ledger_entry');

describe('Ownership', function() {
  it('manifests ownership of a ledgerentry', function() {
    var ownership = new Ownership(new LedgerEntry('ethAddress', 10), 'name');

    expect(ownership.tokenAmount).to.equal(10);
    expect(ownership.owner).to.equal('name');
  });
});