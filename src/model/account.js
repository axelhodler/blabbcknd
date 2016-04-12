function Account(id, email, password, etherAddress) {
  this.id = id;
  this.email = email;
  this.password = password;
  this.etherAddress = etherAddress;
}

Account.prototype.getId = function() {
  return this.id;
};

Account.prototype.getEmail = function() {
  return this.email;
};

Account.prototype.passwordMatches = function(password) {
  return this.password === password;
};

Account.prototype.getEtherAddress = function() {
  return this.etherAddress;
};

module.exports = Account;