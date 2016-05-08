var express = require('express');
var jwt = require('express-jwt');
var tokenProvider = require('./boundaries/token_provider');
var SwaggerExpress = require('swagger-express-mw');

var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var web3setup = require('./boundaries/web3_setup');
web3setup.setup();

var AUTHORIZATION_PATH = '/auth';
app.use(bodyParser.json());
app.use(cors());
app.use('/docs', express.static('swagger-ui'));
app.use(jwt({
  secret: tokenProvider.getSecret(),
  getToken: function fromHeader (req) {
    var authorizationHeader = req.get('Authorization');
    return authorizationHeader ? authorizationHeader : null;
  }}).unless({path: [AUTHORIZATION_PATH, '/swagger', '/docs']}));

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  swaggerExpress.register(app);
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
  
});
