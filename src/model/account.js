function Account(id, email, password, etherAddress, fullName) {
  this.id = id;
  this.email = email;
  this.password = password;
  this.etherAddress = etherAddress;
  this.fullName = fullName;
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

Account.prototype.getFullName = function() {
  return this.fullName;
};

module.exports = Account;