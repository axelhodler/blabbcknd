var RequestWrapper = require('./../boundaries/delivery/request_wrapper');
var ResponseWrapper = require('./../boundaries/delivery/response_wrapper');

var restApiGateway = require('./rest_api_gateway');
var readLedger = require('./rest_api_read_ledger');
var writeToLedger = require('./rest_api_write_to_ledger');
var exchangeTokens = require('./rest_api_exchange_tokens');

var wrapRequest = function(request) {
  return new RequestWrapper(request);
};

var wrapResponse = function(response) {
  return new ResponseWrapper(response);
};

module.exports = {
  toEuro: function(req, res) {
    exchangeTokens.toEuro(wrapRequest(req), wrapResponse(res));
  },
  getAll: function(req, res) {
    readLedger.getAll(wrapRequest(req), wrapResponse(res));
  },
  getBalanceFor: function(req, res) {
    readLedger.getBalanceFor(wrapRequest(req), wrapResponse(res));
  },
  login: function(req, res) {
    restApiGateway.login(wrapRequest(req), wrapResponse(res));
  },
  moveTokens: function(req, res) {
    writeToLedger.moveTokens(wrapRequest(req), wrapResponse(res));
  }
};