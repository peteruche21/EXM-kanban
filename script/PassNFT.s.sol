// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/contracts/PassNFT.sol";

contract DeployPassNFT is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        new PassNFT();

        vm.stopBroadcast();
    }
}
