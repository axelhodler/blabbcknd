function Ownership(ledgerEntry, owner) {
  this.ethereumAddress = ledgerEntry.getEthereumAddress();
  this.tokenAmount = ledgerEntry.getTokenAmount();
  this.owner = owner;
}

Ownership.prototype.getTokenAmount = function() {
  return this.tokenAmount;
};

module.exports = Ownership;
