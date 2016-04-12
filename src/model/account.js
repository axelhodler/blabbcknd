function Account(id, mail, password, etherAddress) {
  this.id = id;
  this.mail = mail;
  this.password = password;
  this.etherAddress = etherAddress;
}

Account.prototype.getId = function() {
  return this.id;
};

Account.prototype.getMail = function() {
  return this.mail;
};

Account.prototype.passwordMatches = function(password) {
  return this.password === password;
};

Account.prototype.getEtherAddress = function() {
  return this.etherAddress;
};

module.exports = Account;