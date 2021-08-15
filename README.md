## Equinox Application
(Under Development)


## App Includes:

##### [Hardhat](https://hardhat.org/) : An Ethereum development task runner and testing network.
##### [Mocha](https://mochajs.org/) : A JavaScript test runner.
##### [Chai](https://www.chaijs.com/) : A JavaScript assertion library.
##### [ethers.js](https://docs.ethers.io/ethers.js/html/) : A JavaScript library for interacting with Ethereum.
##### [Waffle](https://github.com/EthWorks/Waffle/): To have Ethereum-specific Chai assertions/mathers.
##### [A frontend Dapp](https://github.com/willhennessy/hardhat-react-typechain-template/blob/master/frontend) : A Dapp which uses Create React App
##### converts the scripts from Javascript to Typescript and adds TypeChain support

App is using Hardhat and React.

Hardhat: An Ethereum development task runner and testing network.
Mocha: A JavaScript test runner.
Chai: A JavaScript assertion library.
ethers.js: A JavaScript library for interacting with Ethereum.
Waffle: To have Ethereum-specific Chai assertions/mathers.
A frontend/Dapp for a sample: A Dapp which uses Create React App.

# Quick start (Ethereum environment)

```
// access ethereum environment with hardhat
cd equinox app
npm install

//run Hardhat's testing network
npx hardhat node

// compile contracts
npx hardhat compile

// on a new terminal, go to the repository's root folder and run this to deploy your contract
npx hardhat run scripts/deploy.ts --network localhost

```

# Quick start (Frontend)

```
cd frontend
npm install
npm start

//Open http://localhost:3000/ to check App

```
Open http://localhost:3000/ to see Dapp. You will need to have Metamask installed and listening to localhost 8545

User Guide
You can find detailed instructions on using this repository and many tips in its documentation.

### Setting up the environment (https://hardhat.org/tutorial/1-setup/)<br>
### Testing with Hardhat, Mocha and Waffle (https://hardhat.org/tutorial/5-test/)<br>
### Setting up Metamask (https://hardhat.org/tutorial/8-frontend/#setting-up-metamask)<br>
### Hardhat's full documentation (https://hardhat.org/getting-started/)<br>
### For a complete introduction to Hardhat, refer to this guide.
