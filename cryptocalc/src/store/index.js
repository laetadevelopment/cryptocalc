import { createStore } from 'vuex'
import metamask from '../utils/metamask'
import MetaMaskOnboarding from '@metamask/onboarding'
import contract from '@truffle/contract'
import artifacts from '../../build/contracts/Conversions.json'
const Conversions = contract(artifacts)

export default createStore({
  state: {
    metamask: {
      installed: false,
      connected: false,
      address: null,
      network: null,
      ethereum: null,
      web3: null
    },
    contract: {
      conversion: null
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
      metamaskCopy.network = result.ethereum.networkVersion;
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
    currencyConversion (context, payload) {
      Conversions.setProvider(context.state.metamask.web3.currentProvider);
      Conversions.deployed().then((instance) => instance.currencyConversion.call(payload.from)).then((conversion) => {
        context.state.contract.conversion = (conversion.value.toNumber() / 100000000).toFixed(conversion.decimals.toNumber());
      })
    }
  },
  modules: {
  }
})
