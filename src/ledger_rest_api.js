var express = require('express');
var jwt = require('express-jwt');
var tokenProvider = require('./boundaries/token_provider');

var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var Request = require('./boundaries/wrappers/request');
var Response = require('./boundaries/wrappers/response');

var restApiGateway = require('./restapi/rest_api_gateway');
var readLedger = require('./restapi/rest_api_read_ledger');
var writeToLedger = require('./restapi/rest_api_write_to_ledger');
var exchangeTokens = require('./restapi/rest_api_exchange_tokens');

var web3setup = require('./boundaries/web3_setup');
web3setup.setup();

var AUTHORIZATION_PATH = '/auth';

app.use(bodyParser.json());
app.use(cors());
app.use(jwt({
  secret: tokenProvider.getSecret(),
  getToken: function fromHeader (req) {
    var authorizationHeader = req.get('Authorization');
    return authorizationHeader ? authorizationHeader : null;
  }}).unless({path: [AUTHORIZATION_PATH]}));

app.get('/ledgers', function (req, res) {
  readLedger.getAll(new Request(req), new Response(res));
});

app.get('/ledgers/:id', function(req, res) {
  readLedger.getBalanceFor(new Request(req), new Response(res));
});

app.post(AUTHORIZATION_PATH, function(req, res) {
  restApiGateway.login(new Request(req), new Response(res));
});

app.post('/transactions', function(req, res) {
  writeToLedger.moveTokens(new Request(req), new Response(res));
});

app.post('/exchange', function(req, res) {
  exchangeTokens.toEuro(new Request(req), new Response(res));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});