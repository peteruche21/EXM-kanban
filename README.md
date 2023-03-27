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

all NFT pass contracts are available in most evm chains at this address

- `0x41a8947368feb2d8e6694daa05162cf8e4106a9d`
  chains deployed to include

optimism testnet * gnosis choida testnet * scroll alpha testnet * mantle testnet * polygon zkevm testnet * taiko testnet

excluding : * goerli * and * base testnet * which is deployed at `0xf609c8fe0e04492065fcf9e9ac015b43e69d219d`

```sh
# getting started

git clone ....

yarn forge:clean

yarn forge:install

yarn forge:build

yarn forge:test

yarn forge:deploy chain=<name of the chain e.g mumbai>


# client

yarn

yarn dev

yarn build

```
