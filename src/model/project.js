function Project(projectOwner, tokens) {
  this._members = new Map();
  this._tokens = tokens;

  this.availableTokens = function() {
    return this._tokens;
  };

  this.addMember = function(member) {
    this._members.set(member, 0);
  };

  this.tokenAmountFor = function(member) {
    return this._members.get(member);
  };

  this.assignTokens = function(amount, member) {
    this.tokens -= amount;
    this._members.set(member, amount);
  };

  this.exchangeTokens = function(amount, member) {
    this._members.set(member, this.tokenAmountFor(member) - amount);
  };

}

module.exports = Project;