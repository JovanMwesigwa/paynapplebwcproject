// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Paynapple} from "../src/Paynapple.sol";

contract DeployPaynapple is Script {
    // function setUp() public {}

    function run() public returns (Paynapple) {
        address cUSDAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1; // 0x874069fa1eb16d44d622f2e0ca25eea172369bc1
        vm.startBroadcast();
        Paynapple paynapple = new Paynapple(cUSDAddress);
        vm.stopBroadcast();

        return paynapple;
    }
}
