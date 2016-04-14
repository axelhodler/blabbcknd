var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Request = require('./wrappers/request');
var Response = require('./wrappers/response');

var restApiGateway = require('../rest_api_gateway');

app.use(bodyParser.json());

app.get('/ledgers', function (req, res) {
  restApiGateway.getAll(new Request(req), new Response(res));
});

app.get('/ledgers/:id', function(req, res) {
  restApiGateway.getBalanceFor(new Request(req), new Response(res));
});

app.post('/auth', function(req, res) {
  restApiGateway.login(new Request(req), new Response(res));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});