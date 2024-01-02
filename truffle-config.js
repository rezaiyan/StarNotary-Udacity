const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config()

const infuraKey = process.env.INFURA_PROJECT_ID;
const mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*',
    },
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${infuraKey}`),
      network_id: 11155111, // Sepolia's network ID
      gas: 4000000, // Adjust the gas limit as per your requirements
      gasPrice: 10000000000, // Set the gas price to an appropriate value
      confirmations: 2, // Set the number of confirmations needed for a transaction
      timeoutBlocks: 200, // Set the timeout for transactions
      skipDryRun: true, // Skip the dry run option
      networkCheckTimeout: 100000, 
    }
  },
  compilers: {
    solc: {
      version: '^0.8.0',
    },
  },
};
