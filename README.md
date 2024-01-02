# StarNotary Dapp Project

## Overview
StarNotary Dapp is an Ethereum-based decentralized application (Dapp) designed for creating and trading unique stars on the blockchain. It utilizes the ERC-721 standard for non-fungible tokens (NFTs) and offers a user-friendly web interface for interacting with the smart contract.

## Token Information
- ERC-721 Token Name: Haftasia
- ERC-721 Token Symbol: HFS

## Prerequisites
Make sure you have the following dependencies installed on your machine:
- Node and NPM: Verify Node version with `node -v` and NPM version with `npm -v`.
- Truffle v5.X.X: Ethereum development framework.
- Metamask 5.3.1: Ethereum wallet extension.
- Ganache: Local Ethereum blockchain for development.

## Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rezaiyan/StarNotary-Udacity.git
   cd StarNotary-Udacity
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

## Running the Application
### Smart Contract
1. **Start Truffle:**
   ```bash
   truffle develop
   ```

2. **Compile and Migrate:**
   Inside the development console, run:
   ```bash
   compile
   migrate --reset
   ```

3. **Run Tests:**
   ```bash
   test
   ```

### Frontend
1. **Navigate to the App Folder:**
   ```bash
   cd app
   ```

2. **Install Dependencies:**
   ```bash
   yarn install
   ```

3. **Start the Frontend:**
   ```bash
   yarn start
   ```

### Metamask Configuration
When adding a new Rinkeby Test Network in Metamask, provide the following details:
- **Network Name:** Private Network 1
- **New RPC URL:** http://127.0.0.1:9545/
- **Chain ID:** 1337

You can fetch the chain ID by running:
```bash
cd app
node index.js
```

## Troubleshooting
### Error 1: 'webpack-dev-server' is not recognized as an internal or external command
**Solution:**
1. Delete the `node_modules` folder within the `/app` folder.
2. Execute `npm install` command from the `/app` folder.

### Error 2: ParserError - Source file requires a different compiler version
**Solution:**
In the `truffle-config.js` file, configure your compilers:
```javascript
compilers: {
  solc: {
    version: "0.5.16", // Use this version
    // docker: true,
    // ...
  }
}
```

## Deployment Log
```bash
truffle migrate --network sepolia
```
Compiling your contracts...
... (Output Truncated for Brevity)

## Summary
- Total Deployments: 2
- Final Cost: 0.0288783 ETH

[Contract Transactions](https://sepolia.etherscan.io/address/0xDA82D3d3c6d1Bd34578955abd62eD806bF7c7da1)

## Contributing and Reporting Issues
Feel free to contribute by raising a Pull Request for bug fixes or improvements. If you have suggestions or face issues, please log an issue.