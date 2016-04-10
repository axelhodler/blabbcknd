var api = require('./rest_api_gateway');
var td = require('testdouble');

describe('rest api gateway', function() {
  it('can provide an overview of tokens for each', function() {
    function Response(){};
    Response.prototype.send = function(){};
    var responseSpy = td.object(Response);

    var overview = api.fetchOverview({}, responseSpy);

    td.verify(responseSpy.send('overview'));
  });
});