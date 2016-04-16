var ethereumGatewayTd = td.replace('./../boundaries/ethereum_gateway');
var writeToLedger = require('./write_to_ledger');

describe('Write to ledger', function() {
  it('sends tokens from one account to another', function() {
    writeToLedger.moveTokens('fromEtherAddress', 'toEtherAddress', 100);

    td.verify(ethereumGatewayTd.moveTokens('fromEtherAddress', 'toEtherAddress', 100));
  });
});