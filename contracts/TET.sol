//SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TET is ERC20, Ownable {
    constructor(uint256 _totalSupply) ERC20("Test ERC20 Token", "TET") {
        _mint(msg.sender, _totalSupply);
    }
}
