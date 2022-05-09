// this test fails because the test network does not connect to the Mainnet Chainlink Oracle
const Conversions = artifacts.require("Conversions");
const currencies = ["ETH", "USD"];
contract("Conversions", (accounts) => {
  let contractInstance;
    beforeEach(async () => {
      contractInstance = await Conversions.new();
    });
    it("should be able to return current ETH/USD value and decimals", async () => {
      const result = await contractInstance.currencyConversion(currencies[0]);
      assert.equal(result.receipt.status, true);
    })
    it("should be able to return current USD/ETH value and decimals", async () => {
      const result = await contractInstance.currencyConversion(currencies[1]);
      assert.equal(result.receipt.status, true);
    })
})
