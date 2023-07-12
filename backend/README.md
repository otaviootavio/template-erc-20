# Backend

This is the backend, here you can develop, test and deploy you smart contracts.

> Note that this file is not going to explain or teach anything related to Hardhat, it only explains how to use this preconfigured model

> Obs.: Every time we give you a command, consider that you gotta run it in a terminal which is **inside** this /backend directory. If any command needs to be runned in a diferent folder it'll be **explicitly** said.

## First steps

There is a few things you gotta do to prepare you computer to run this part:

### env file
Basically we have 3 main enviroment variables here:

- **ALCHEMY_API_KEY**: Here you can put the Alchemy API Key for using it's provider
- **ETHERSCAN_API_KEY**: You can, optionaly, put and Etherscan key for checking your deployed contracts.
- **PRIVATE_KEY**: Here you must put a wallet's private key, this wallet will be the one responsible for deploying the contract. You can use a private key for a Hardhat fake wallet for local testing if you want.

### Installing dependencies

As simple as any node project: run ```npm install``` and wait.

## How to run it?

On this section we are going to cover the commands to run the different scenarios.

### Locally

You need to cover this 2 simple steps:

1. You need a local node, for that, open a terminal and run ```npm run node```. This will start a node and give you some fake wallets for testing.

> Do not close this terminal, it is responsible for hosting your fake network as well as testing wallets, once you close it, the ledger is wiped.

3. Then, you can now deploy your contract, just run ```npm run deploy-local```, and it's done!

### Testnet

Here it's even easier!

Just run ```npm run deploy-sepolia```, and that's it!

> **ALERT:** This action is payable with faucet coins, be aware of that!

### Mainnet

Run ```npm run deploy-mainnet```.

> **ALERT:** This action is payable with **real** ethereum, be aware of that!
