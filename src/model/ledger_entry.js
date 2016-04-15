function LedgerEntry(ethereumAddress, tokenAmount) {
  this.ethereumAddress = ethereumAddress;
  this.tokenAmount = tokenAmount;
}

LedgerEntry.prototype.getEthereumAddress = function() {
  return this.ethereumAddress;
};

LedgerEntry.prototype.getTokenAmount = function() {
  return this.tokenAmount;
};

module.exports = LedgerEntry;