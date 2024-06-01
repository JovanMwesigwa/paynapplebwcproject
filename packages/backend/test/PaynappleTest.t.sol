// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Paynapple} from "../src/Paynapple.sol";
import {DeployPaynapple} from "../script/DeployPaynapple.s.sol";

contract PaynappleTest is Test {
    Paynapple public paynapple;

    // This mocks a test user's balances
    uint256 public constant STARTING_USER_BALANCE = 10 ether;
    uint256 public constant GAS_PRICE = 1;

    address public constant USER = address(1);

    function setUp() public {
        DeployPaynapple deployPaynapple = new DeployPaynapple(); // Uses the DeployPaynapple script to deploy the Paynapple contract
        paynapple = deployPaynapple.run(); // Returns the deployed and returned contract and sets it to the paynapple variable
        vm.deal(USER, STARTING_USER_BALANCE);
    }

    // function testAddMenuItem() public {
    //     paynapple.addMenuItem(
    //         "Burger",
    //         "A delicious burger",
    //         10,
    //         Paynapple.Category.Burgers,
    //     );
    //     assertEq(paynapple.getMenuItemsCount(), 1);
    // }

    // function testOwnerAddressSetSuccessfully() public view {
    //     assertEq(paynapple.getOwner(), address(this));
    // }
}
