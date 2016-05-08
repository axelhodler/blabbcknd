var Request = require('./../boundaries/wrappers/request');
var Response = require('./../boundaries/wrappers/response');

var restApiGateway = require('./rest_api_gateway');
var readLedger = require('./rest_api_read_ledger');
var writeToLedger = require('./rest_api_write_to_ledger');
var exchangeTokens = require('./rest_api_exchange_tokens');

module.exports = {
  toEuro: function(req, res) {
    exchangeTokens.toEuro(new Request(req), new Response(res));
  },
  getAll: function(req, res) {
    readLedger.getAll(new Request(req), new Response(res));
  },
  getBalanceFor: function(req, res) {
    readLedger.getBalanceFor(new Request(req), new Response(res));
  },
  login: function(req, res) {
    restApiGateway.login(new Request(req), new Response(res))
  },
  moveTokens: function(req, res) {
    writeToLedger.moveTokens(new Request(req), new Response(res));
  }
};