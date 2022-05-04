import Web3 from 'web3'
import contract from '@truffle/contract'
import artifacts from '../../../build/contracts/Conversions.json'
const Conversions = contract(artifacts)

let metamask = new Promise(function (resolve, reject) {
  var ethereum = window.ethereum;
  if (typeof ethereum !== 'undefined') {
    var web3 = new Web3(ethereum);
    Conversions.setProvider(web3.currentProvider);
    Conversions.deployed().then((instance) => instance.getLatestPrice.call()).then((r) => {
      console.log(r.toNumber())
    });
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
