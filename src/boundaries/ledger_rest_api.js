var express = require('express');
var app = express();
var restApiGateway = require('../rest_api_gateway');

app.get('/ledgers', function (req, res) {
  restApiGateway.getAll(req, res);
});

app.get('/ledgers/:id', function(req, res) {
  restApiGateway.getBalanceFor(req, res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});