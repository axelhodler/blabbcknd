var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Request = require('./wrappers/request');
var Response = require('./wrappers/response');

var restApiGateway = require('../rest_api_gateway');
var readLedger = require('../rest_api_read_ledger');
var writeToLedger = require('../rest_api_write_to_ledger');

app.use(bodyParser.json());

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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});