var writeToLedger = require('./../actions/write_to_ledger');

module.exports = {
  toEuro: function(request, response) {
    writeToLedger.destroyTokens(request.body().recipient, request.body().amount);

    return response.sendOk();
  }
};