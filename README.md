# web3-dapp-template

This repo contains a basic template for developing a Web3 Dapp. It's divided in two main parts: frontend and backend.

The instructions for this template will assume that you have basic programs already installed, like Node.js, Git, an IDE, MetaMask (or any wallet), etc.

Each part has its own README.md file with more detailed information and instructions, but here is a short description:

> Note.: This repo is made as a Hackathon/PoC template, thus it's not intended to have a large support for diferent tools, chains, providers, frameworks and etc. We want to keep it simple, just a handful tools for quick developing Dapps. Of course you can use the template and add/remove/change anything you want to make it work according your needs :)

## Frontend

The frontend is a ViteJs App using wagmi + rainbowkit template. Wagmi uses an Alchemy provider as default, but also has a public provider as well to interact with testnets or even main nets. (Project is configured for Hardhat, Sapolia and Ethereum).
It has MaterialUI preconfigured so you can quickly build pages with the built in components.
You also can quickly deploy this template in Vercel, just remember to check vite.config.ts for the needed changes.

> Obs.: Wagmi has a bunch of other preinstalled providers/chains which you can use as well, but they are not previusly configured.

## Backend

Backend part includes two example contracts, with deploy.js file an example tests pre-configured.
Hardhat is configured to easily deploy localy (on a hardhat node), in the Sapolia Testnet, and, of course, Ethereum Mainnet.

> Obs.: When deployed the contracts Address and ABI will be updated in frontend files.

# Thank you!

This project, as any other, have room for improvement. And, of course, Web3 evolves fast, and we want to always keep it up to date, so feel free to sugest improvements, updates, adding lacking information and etc.

Star the repo to support the work! :D
