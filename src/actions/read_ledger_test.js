var ethereumGatewayTd = td.replace('./../boundaries/blockchain/ethereum_gateway');
var accountGateway = td.replace('./../boundaries/account_gateway');
var readLedger = require('./read_ledger');

describe('ledger gateway', function() {
  it('provides balance for an account id', function() {
    td.when(accountGateway.fetchOwnerOf('ethereumAddress')).thenReturn('Felicitas Jebediah');
    td.when(ethereumGatewayTd.balanceOf('ethereumAddress')).thenReturn(1000);

    var ownership = readLedger.balanceOf('ethereumAddress');

    expect(ownership.owner).to.equal('Felicitas Jebediah');
    expect(ownership.ethereumAddress).to.equal('ethereumAddress');
    expect(ownership.tokenAmount).to.equal(1000);
  });

  it('provides list of all ledgers', function() {
    td.when(accountGateway.fetchAllEtherAddresses()).thenReturn(['firstAddress', 'secondAddress']);
    td.when(accountGateway.fetchOwnerOf('firstAddress')).thenReturn('Long John');
    td.when(accountGateway.fetchOwnerOf('secondAddress')).thenReturn('Stumped Stef');
    td.when(ethereumGatewayTd.balanceOf('firstAddress')).thenReturn(28);
    td.when(ethereumGatewayTd.balanceOf('secondAddress')).thenReturn(36);

    var ownership = readLedger.allBalances();

    expect(ownership.length).to.equal(2);
    expect(ownership[0].tokenAmount).to.equal(28);
    expect(ownership[1].tokenAmount).to.equal(36);
    expect(ownership[0].owner).to.equal('Long John');
    expect(ownership[1].owner).to.equal('Stumped Stef');
  });
});
