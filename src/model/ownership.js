function Ownership(ledgerEntry, owner) {
  this.ethereumAddress = ledgerEntry.getEthereumAddress();
  this.tokenAmount = ledgerEntry.getTokenAmount();
  this.owner = owner;
}

module.exports = Ownership;
