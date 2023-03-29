<p align="center">
    <img src="./src/assets/vector/default.svg" height="200" style="border-radius:50%">
</p>
<div align="center">
  <h3 align="center">
  Third Board
  </h3>
</div>

<div align="center">

**Third Board** is a lightweight, self hosted, fast alternative to dework. a fully customizable project management solution leveraging on decentralized storage and NFT gated authentication.

</div>

## Contracts

all NFT pass contracts are available in most evm chains at this address

`0x41a8947368feb2d8e6694daa05162cf8e4106a9d`
chains deployed to include

optimism testnet _ gnosis choida testnet _ scroll alpha testnet _ mantle testnet _ polygon zkevm testnet \* taiko testnet

excluding : _ goerli _ and _ base testnet _ which is deployed at `0xf609c8fe0e04492065fcf9e9ac015b43e69d219d`

## Demo

paste your address in the url `https:://third-board.vercel.app/<your address here>`
if you don't have a **Pass NFT** one will be minted for you.
if its not able to mint one for you (probably out of gas), transfer **goerliEth** to this address `0x6394f2E9660a2D718ca03F9316F0e89c82CF85BA` and try again.

## Usage

this is a self hosted application.
you have to host it yourself, or try the demo.

- step 1

clone the repository

```sh
git clone https://github.com/peteruche21/EXM-kanban.git
```

- step 2

copy rename the .env.example and provide the required vars

```sh
cp .env.example .env
```

- step 3

setup up the NFT pass contract.
We will be using **goerli** because whal3s NFT validation surpports just a few chains for now.
Ensure that you have your **private key**, **goerli rpc** and **etherscan api key** in your environment variables.
Follow this [guide]("https://book.getfoundry.sh/getting-started/installation") if you don't have foundry installed.

you can obtain a free _RPC NODE URL_ from [quicknode]("https://www.quicknode.com/")

```sh
yarn forge:clean

yarn forge:install

yarn forge:build

yarn forge:test

yarn forge:deploy chain=goerli

# you can deploy to other chains by specifying chain=<chain name>
```

- step 4

get your **whal3s** API KEY and set up your NFT Validation Utility by following this guides in the [docs]("https://docs.whal3s.xyz/")

- step 5

Add your constants. [here](./src/constants/index.ts)

1. **contractAddress** - replace with the address of the new deployed `passNFT`.
2. **nftValidationKey** - replace with the NFT Utility key from step 4
3. **whal3sApiKey** - add your API key from step 4 in the _.env_ file.
4. **namespace** - replace with your Database name/identifier.

- step 6

the application uses [polybase]("https://polybase.xyz") by default, but you can configure it yourself to use [execution machine]("https://exm.dev")
by deploying the `EXM functions`.

create an account on [exm website]("https://exm.dev") and get an **api token/key** make sure you have [EXM cli]("https://docs.exm.dev/cli/introduction") installed.

```sh
exm function:deploy --src src/exm/function.js --init-state '{ "tasks": [], "archive": [], "projects": [] }' --token <your exm api token/key here>

```

update the constants with the generated exmFnId, exmFnSource and exmFnUrl.
also add your _EXM_KEY to your _.env\_

## Client

```sh
# install dependencies
yarn
# run local development server
yarn dev
# build for production
yarn vite:build
# preview build
yarn preview
```

the application is built using:

- typescript
- vite
- tailwindcss
- blocknative
- whal3s
- quicknode
- polybase
- exm
- daisy ui

so you can customize pretty much everything and deploy it anywhere [gcp, aws, azure, vercel, render, netlify ...]
