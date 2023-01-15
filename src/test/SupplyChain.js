const { assert } = require("hardhat");
const SupplyChain = artifacts.require("SupplyChain");

describe("Auth.sol contract", function () {
    let accounts;
    let supplyChain;

    before(async function () {
        accounts = await web3.eth.getAccounts();
        supplyChain = await SupplyChain.new();
    });

    it("Should deploy with 0 products initially", async function () {
        console.log(await supplyChain.getUserProducts(accounts[0]));
        assert.equal(await supplyChain.getUserProducts(accounts[0]), 0);
    });

    it("Correctly creates a new product and sets the correct owner", async function () {
        await supplyChain.createProduct("productName");
        assert.equal(((await supplyChain.getUserProducts(accounts[0]))[0])[0], 1);
    });

    it("Correctly transfers a product's ownership", async function () {
        await supplyChain.transferProduct(1, accounts[1]);
        assert.equal(((await supplyChain.getUserProducts(accounts[0]))[0])[0], 0);
    });
});