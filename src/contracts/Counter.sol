// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract Counter is ERC2771Context  {
    event Increment(
        address indexed currentUser,
        address indexed previousUser,
        uint256 step
    );

    event Decrement(
        address indexed currentUser,
        address indexed previousUser,
        uint256 step
    );

    address public currentUser = address(0);
    uint256 public value;

    constructor(address forwarder, uint256 initValue)
    ERC2771Context(forwarder)
    {
        value = initValue;
    }

    function increment(uint256 step) external {
        value = value + step;
        currentUser = _msgSender();
        emit Increment(_msgSender(), currentUser, step);
    }

    function decrement(uint256 step) external  {
        value = value - step;
        emit Decrement(_msgSender(), currentUser, step);
    }

    string public versionRecipient = "3.0.0";
}
