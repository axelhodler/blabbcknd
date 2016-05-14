var ethereumGatewayTd = td.replace('./../boundaries/blockchain/ethereum_gateway');
var writeToLedger = require('./write_to_ledger');

describe('Write to ledger', function() {
  it('sends tokens from one account to another', function() {
    writeToLedger.moveTokens('fromEtherAddress', 'toEtherAddress', 100);

    td.verify(ethereumGatewayTd.moveTokens('fromEtherAddress', 'toEtherAddress', 100));
  });

  it('can destroy tokens', function() {
    writeToLedger.destroyTokens('fromEtherAddress', 100);

    td.verify(ethereumGatewayTd.moveTokens(
      'fromEtherAddress',
      '0x0000000000000000000000000000000000000000',
      100
    ));
  });
});