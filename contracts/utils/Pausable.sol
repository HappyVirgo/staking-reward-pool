//SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./Owned.sol";

abstract contract Pausable is Owned {
    uint256 public lastPauseTime;
    bool public paused;

    constructor() {
        require(owner != address(0), "Owner must be set");
    }

    function setPaused(bool _paused) external onlyOwner {
        if (_paused == paused) {
            return;
        }

        paused = _paused;

        if (paused) {
            lastPauseTime = block.timestamp;
        }

        emit PauseChanged(paused);
    }

    event PauseChanged(bool isPaused);

    modifier notPaused() {
        require(
            !paused,
            "This action cannot be performed while the contact is paused"
        );
        _;
    }
}
