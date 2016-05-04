var express = require('express');
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

app.use(bodyParser.json());
app.use(cors());

app.get('/ledgers', function (req, res) {
  readLedger.getAll(new Request(req), new Response(res));
});

app.get('/ledgers/:id', function(req, res) {
  readLedger.getBalanceFor(new Request(req), new Response(res));
});

app.post('/auth', function(req, res) {
  restApiGateway.login(new Request(req), new Response(res));
});

app.post('/transactions', function(req, res) {
  writeToLedger.moveTokens(new Request(req), new Response(res));
});

app.post('/exchange', function(req, res) {
  exchangeTokens.toEuro(req, res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});