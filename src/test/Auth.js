const { assert } = require("hardhat");
const Auth = artifacts.require("Auth");

describe("Auth.sol contract", function () {
    let accounts;
    let auth;

    before(async function () {
        accounts = await web3.eth.getAccounts();
        auth = await Auth.new();
    });
    it("Should deploy with 0 users initially", async function () {
        assert.equal(await auth.userCount(), 0);
    });

    it("Correctly creates a new user and stores it in the blockchain", async function () {
        const response = await auth.createUser("username", "email", "password");
        assert.isNotNull(response.tx)
    });
});