module.exports = {
  wrap: function(request) {
    this.request = request;
    return this;
  },
  idParam: function() {
    return this.request.params.id;
  },
  authorizationHeader: function() {
    return this.request.get('Authorization');
  },
  body: function() {
    return this.request.body;
  }
};