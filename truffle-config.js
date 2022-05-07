const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()

const kovankey = process.env.KOVAN_PRIVATE_KEY
const kovanurl = process.env.KOVAN_RPC_URL
const mainnetkey = process.env.MAINNET_PRIVATE_KEY
const mainneturl = process.env.MAINNET_RPC_URL

module.exports = {
  networks: {
    kovan: {
      provider: () => {
        return new HDWalletProvider(kovankey, kovanurl)
      },
      network_id: '42',
      skipDryRun: true
    },
    mainnet: {
      provider: () => {
        return new HDWalletProvider(mainnetkey, mainneturl)
      },
      network_id: '1',
      gas: 828355,
      gasPrice: 30000000000
    }
  },

  compilers: {
    solc: {
      version: "0.8.13",
    }
  }
};
