import Web3 from 'web3'

let metamask = new Promise(function (resolve, reject) {
  var ethereum = window.ethereum;
  if (typeof ethereum !== 'undefined') {
    var web3 = new Web3(ethereum);
    resolve({
      installed: ethereum.isMetaMask,
      connected: ethereum.isConnected(),
      address: ethereum.selectedAddress,
      ethereum: ethereum,
      web3: web3
    })
  } else {
    reject(new Error('Unable to connect to Metamask'));
  }
})

export default metamask
