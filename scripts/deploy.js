const { ethers } = require("hardhat");

async function main() {
    // const WETH = 0xecf8f87f810ecf450940c9f60066b4a7a501d6a7;
    // We get the contract to deploy
    const [owner] = await ethers.getSigners();

    const TET = await ethers.getContractFactory("TET");
    const tet = await TET.deploy(21000000);
    await tet.deployed();

    const WETH = await ethers.getContractFactory("WETH");
    const weth = await WETH.deploy({
        value: ethers.utils.parseEther("1.0")
    });
    await weth.deployed();

    const StakingRewardPool = await ethers.getContractFactory("StakingRewardsPool");
    const stakingRewardPool = await StakingRewardPool.deploy(owner.address, owner.address, tet.address, weth.address,)
    await tet.transfer(stakingRewardPool.address, 21000000)

    console.log('Staking Reward Pool launched at:', stakingRewardPool.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });