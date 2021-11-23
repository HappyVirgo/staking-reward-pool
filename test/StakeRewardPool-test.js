const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectRevert } = require("@openzeppelin/test-helpers")

const totalSupply = 21000000
describe("Staking Reward Pool", function () {
    before(async function () {
        // We get the contract to deploy
        const [owner] = await ethers.getSigners();
        this.owner = owner
        const TET = await ethers.getContractFactory("TET");
        this.tet = await TET.deploy(totalSupply);
        await this.tet.deployed();

        const WETH = await ethers.getContractFactory("WETH");
        this.weth = await WETH.deploy({
            value: ethers.utils.parseEther("1.0")
        });
        await this.weth.deployed();

        this.StakingRewardPool = await ethers.getContractFactory("StakingRewardsPool");
        this.stakingRewardPool = await this.StakingRewardPool.deploy(owner.address, owner.address, this.tet.address, this.weth.address);
        await this.tet.transfer(this.stakingRewardPool.address, totalSupply);
    })
    it("total supply and balance of the sender should increase while staking and rewardpertoken should be stored", async function () {
        await this.weth.approve(this.stakingRewardPool.address, 1000000);
        await this.stakingRewardPool.stake(1000000);
        expect(await this.stakingRewardPool.totalSupply()).to.equal(1000000);
        expect(await this.stakingRewardPool.balaceOf(this.owner.address)).to.equal(1000000);
    })
    it("rewards duration should 30 days and total reward amount should be total supply of tet token", async function () {
        await this.stakingRewardPool.notifyRewardAmount(totalSupply);
        expect(await this.tet.balanceOf(this.stakingRewardPool.address)).to.equal(totalSupply);
        expect(await this.stakingRewardPool.rewardsDuration() / (3600 * 24)).to.equal(30);
    })
})