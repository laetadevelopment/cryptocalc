// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Conversions is Ownable {

  AggregatorV3Interface internal priceFeed;

  /**
   * Network: Kovan
   * Aggregator: ETH/USD
   * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
   */
  constructor() {
    priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
  }

  /**
   * Returns the latest price
   */
  function getLatestPrice() public view returns (int) {
    (
      /*uint80 roundID*/,
      int price,
      /*uint startedAt*/,
      /*uint timeStamp*/,
      /*uint80 answeredInRound*/
    ) = priceFeed.latestRoundData();
    return price;
  }

  function currencyConversion(string memory _from) public view returns (int value, uint8 decimals) {
    int price = getLatestPrice();
    uint8 decimalPlaces = priceFeed.decimals();
    if (keccak256(abi.encodePacked(_from)) == keccak256(abi.encodePacked("ETH"))) {
      return (price, decimalPlaces);
    } else if (keccak256(abi.encodePacked(_from)) == keccak256(abi.encodePacked("USD"))) {
      price = (10000000000000000 / price);
      return (price, decimalPlaces);
    }
  }
}
