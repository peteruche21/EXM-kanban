-include .env

.PHONY: all test clean deploy-anvil

all: clean install update build

clean  :; forge clean

install :; forge install foundry-rs/forge-std openzeppelin/openzeppelin-contracts --no-commit

update:; forge update

build:; forge build

test :; forge test 

snapshot :; forge snapshot

verify :; forge verify-contract ${contract} PassNFT --watch --verifier-url ${BASE_BASESCAN_URL} -- --etherscan-api-key

format :; prettier --write src/**/*.sol && prettier --write src/**/*.t{s,sx} && prettier --write src/*.t{sx,s}

anvil :; anvil -m 'test test test test test test test test test test test junk'

anvil-fork :; anvil --fork-url ${BASE_RPC_URL} -m 'test test test test test test test test test test test junk'

deploy-base-goerli :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${BASE_RPC_URL} --private-key ${PRIVATE_KEY} --broadcast --verify  --verifier-url ${BASE_BASESCAN_URL} -- --etherscan-api-key -vvvv 

deploy-anvil :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url http://localhost:8545  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast  	