import { createStore } from 'vuex'
import metamask from '../utils/metamask'

export default createStore({
  state: {
    metamask: {
      installed: false,
      connected: false,
      address: null,
      ethereum: null,
      web3: null
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
      console.log(state.metamask);
    }
  },
  actions: {
    setMetamask ({commit}) {
      metamask.then(result => {
        commit('updateMetamask', result);
      }).catch(e => {xs
        console.log('error updating MetaMask', e);
      })
    },
    connectMetamask (context) {
      context.state.metamask.ethereum.request({ method: 'eth_requestAccounts' }).then(result => {
        context.state.metamask.connected = true;
        context.state.metamask.address = result[0];
        console.log(context.state.metamask);
      }).catch(e => {
        console.log('error connecting MetaMask', e);
      })
    }
  },
  modules: {
  }
})
