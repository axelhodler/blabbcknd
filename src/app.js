require('./boundaries/blockchain/web3_setup')().then(function() {
  require('./boundaries/delivery/ledger_rest_api').start();
});
