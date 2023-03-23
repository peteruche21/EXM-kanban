// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/contracts/PassNFT.sol";

contract PassNFTTest is Test {
    PassNFT public pass;

    function setUp() public {
        pass = new PassNFT();
    }

    function testMint() public {
        pass.safeMint(msg.sender, "uri://foundry.test.com");
        assertEq(pass.balanceOf(msg.sender), 1);
    }

    function testBurn() public {
        pass.safeMint(address(uint160(8006)), "uri://foundry.test.com");
        assertEq(pass.ownerOf(0), (address(uint160(8006))));
        pass.burn(0);
        assertEq(pass.balanceOf(address(uint160(8006))), 0);

    }

    function testUri() public {
        pass.safeMint(address(uint160(8006)), "uri://foundry.test.com");
        string memory uri = pass.tokenURI(0);
        bool compare = keccak256(bytes(uri)) ==
            keccak256(bytes("uri://foundry.test.com"));
        assertEq(compare, true);
    }
}
