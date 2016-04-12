var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var restApiGateway = require('../rest_api_gateway');

app.use(bodyParser.json());

app.get('/ledgers', function (req, res) {
  restApiGateway.getAll(req, res);
});

app.get('/ledgers/:id', function(req, res) {
  restApiGateway.getBalanceFor(req, res);
});

app.post('/auth', function(req, res) {

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});