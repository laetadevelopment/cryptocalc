const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()

const key = process.env.PRIVATE_KEY
const url = process.env.RPC_URL

module.exports = {
  networks: {
    kovan: {
      provider: () => {
        return new HDWalletProvider(key, url)
      },
      network_id: '42',
      skipDryRun: true
    },
  },

  compilers: {
    solc: {
      version: "0.8.13",
    }
  }
};
