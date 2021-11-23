const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TET", function () {
    before(async function () {
        this.TET = await ethers.getContractFactory('TET');
    });

    beforeEach(async function () {
        this.tet = await this.TET.deploy(21000000);
        await this.tet.deployed();
    });
    it("Should mint all tokens to the deployer while deployment", async function () {
        const [owner] = await ethers.getSigners();
        const ownerBalance = await this.tet.balanceOf(owner.address);
        expect(ownerBalance).to.equal(21000000);
    })
    it("Name and symbol should be Test ERC20 Token and TET", async function () {
        expect(await this.tet.name()).to.equal("Test ERC20 Token");
        expect(await this.tet.symbol()).to.equal("TET");
        expect(await this.tet.decimals()).to.equal(18);
    })
})