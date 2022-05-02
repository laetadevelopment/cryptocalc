import { createStore } from 'vuex'
import getWeb3 from '../utils/getWeb3'

export default createStore({
  state: {
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      wallet: null,
      balance: null,
      error: null
    },
    contractInstance: 'address'
  },
  getters: {
  },
  mutations: {
    registerWeb3Instance (state, payload) {
      let result = payload;
      let web3Copy = state.web3;
      web3Copy.wallet = result.wallet;
      web3Copy.networkId = result.networkId;
      web3Copy.balance = parseInt(result.balance, 10);
      web3Copy.isInjected = result.injectedWeb3;
      web3Copy.web3Instance = result.web3;
      state.web3 = web3Copy;
    }
  },
  actions: {
    registerWeb3 ({commit}) {
      getWeb3.then(result => {
        commit('registerWeb3Instance', result);
      }).catch(e => {
        console.log('error in registerWeb3 action', e);
      })
    }
  },
  modules: {
  }
})
