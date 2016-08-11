function LedgerEntry(ethereumAddress, tokenAmount) {
  this._ethereumAddress = ethereumAddress;
  this._tokenAmount = tokenAmount;

  this.getEthereumAddress = function() {
    return this._ethereumAddress;
  };

  this.getTokenAmount = function() {
    return this._tokenAmount;
  };
}

module.exports = LedgerEntry;