var authUser = require('./../actions/auth_user');

module.exports = {
  login: function(req, res) {
    res.send(authUser.login(req.body().email, req.body().password));
  }
};