import Web3 from 'web3'

let getWeb3 = new Promise(function (resolve, reject) {
  var web3js = window.ethereum;
  if (typeof web3js !== 'undefined') {
    var web3 = new Web3(web3js.currentProvider);
    resolve({
      wallet: "test",
      networkId: "test",
      balance: 0,
      injectedWeb3: "test",
      web3 () {
        return web3
      }
    })
  } else {
    reject(new Error('Unable to connect to Metamask'));
  }
})

export default getWeb3
