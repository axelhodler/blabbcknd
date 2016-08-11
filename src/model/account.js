function Account(id, email, password, etherAddress, fullName) {
  this._id = id;
  this._email = email;
  this._password = password;
  this._etherAddress = etherAddress;
  this._fullName = fullName;

  this.getId = function() {
    return this._id;
  };

  this.getEmail = function() {
    return this._email;
  };

  this.passwordMatches = function(password) {
    return this._password === password;
  };

  this.getEtherAddress = function() {
    return this._etherAddress;
  };

  this.getFullName = function() {
    return this._fullName;
  };
}

module.exports = Account;