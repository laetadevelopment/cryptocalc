import { createStore } from 'vuex'
import metamask from '../utils/metamask'
import MetaMaskOnboarding from '@metamask/onboarding'
import contract from '@truffle/contract'
import artifacts from '../../../build/contracts/Conversions.json'
const Conversions = contract(artifacts)

export default createStore({
  state: {
    metamask: {
      installed: false,
      connected: false,
      address: null,
      ethereum: null,
      web3: null
    },
    contract: {
      price: null
    }
  },
  getters: {
  },
  mutations: {
    updateMetamask (state, payload) {
      let result = payload;
      let metamaskCopy = state.metamask;
      metamaskCopy.installed = result.installed;
      metamaskCopy.connected = result.connected;
      metamaskCopy.address = result.address;
      metamaskCopy.ethereum = result.ethereum;
      metamaskCopy.web3 = result.web3;
      state.metamask = metamaskCopy;
    }
  },
  actions: {
    setMetamask ({commit}) {
      metamask.then(result => {
        commit('updateMetamask', result);
      }).catch(e => {
        console.log('error updating MetaMask', e);
      })
    },
    installMetamask () {
      var onboarding = new MetaMaskOnboarding();
      onboarding.startOnboarding();
    },
    connectMetamask (context) {
      context.state.metamask.ethereum.request({ method: 'eth_requestAccounts' }).then(result => {
        context.state.metamask.connected = true;
        context.state.metamask.address = result[0];
      }).catch(e => {
        console.log('error connecting MetaMask', e);
      })
    },
    currencyConversion (context) {
      Conversions.setProvider(web3.currentProvider);
      Conversions.deployed().then((instance) => instance.getLatestPrice.call()).then((price) => {
        console.log(price.toNumber());
        context.state.contract.price = price.toNumber();
      })
      Conversions.deployed().then((instance) => instance.getDecimals.call()).then((decimals) => {
        console.log((context.state.contract.price / 100000000).toFixed(decimals.toNumber()));
        context.state.contract.price = (context.state.contract.price / 100000000).toFixed(decimals.toNumber());
      })
    }
  },
  modules: {
  }
})
