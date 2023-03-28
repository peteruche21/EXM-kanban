-include .env

.PHONY: all test clean deploy-anvil

all: clean install update build

clean  :; forge clean

install :; forge install foundry-rs/forge-std openzeppelin/openzeppelin-contracts --no-commit

update:; forge update

build:; forge build

test :; forge test 

snapshot :; forge snapshot

verify-base :; forge verify-contract ${contract} PassNFT --watch --verifier-url ${BASE_SCAN_URL} -- --etherscan-api-key

verify-scroll :; forge verify-contract ${contract} PassNFT --watch --verifier sourcify --verifier-url ${SCROLL_SCAN_URL}

format :; prettier --write src/**/*.sol && prettier --write src/**/*.t{s,sx} && prettier --write src/*.t{sx,s}

anvil :; anvil -m 'test test test test test test test test test test test junk'

anvil-fork :; anvil --fork-url ${BASE_RPC_URL} -m 'test test test test test test test test test test test junk'

deploy-sepoila :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${SEPOILA_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY}  -vvvv

deploy-goerli :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${GOERLI_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY}  -vvvv

deploy-base-goerli :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${BASE_RPC_URL} --private-key ${PRIVATE_KEY} --broadcast  --verify  --verifier-url ${BASE_SCAN_URL} -- --etherscan-api-key -vvvv 

deploy-mumbai :;  @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${MUMBAI_RPC_URL} --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${MUMBAI_SCAN_API_KEY} -vvvv 

deploy-anvil :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url http://localhost:8545  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast  	

deploy-gnosis :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${GNOSIS_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast  -vvvv

deploy-taiko :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${TAIKO_RPC_URL}  --private-key ${PRIVATE_KEY} --legacy --broadcast   -vvvv

deploy-mantle :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${MANTLE_RPC_URL}  --private-key ${PRIVATE_KEY} --legacy --broadcast   -vvvv

deploy-scroll :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${SCROLL_RPC_URL}  --private-key ${PRIVATE_KEY} --legacy --broadcast   -vvvv

deploy-op :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${OP_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast   -vvvv

deploy-zkevm-testnet :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${ZKEVM_TESTNET_RPC_URL}  --private-key ${PRIVATE_KEY} --legacy --broadcast   -vvvv

deploy-op-testnet :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${OPTESTNET_RPC_URL}  --private-key ${PRIVATE_KEY} --legacy --broadcast  -vvvv

deploy :; make deploy-${chain}

verify :; make verify-${chain}