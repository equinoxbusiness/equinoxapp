# Equinox Application

- Under Development

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

Documentation:
[Hardhat documemntation](https://hardhat.org/getting-started/)
