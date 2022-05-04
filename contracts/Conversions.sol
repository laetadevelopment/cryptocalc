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

  function getDecimals() public view returns (uint8) {
    uint8 decimals = priceFeed.decimals();
    return decimals;
  }

  // function _getDecimals() internal returns (uint8) {
  //   uint8 decimals = priceFeed.decimals();
  //   return decimals;
  // }

  // function _getConversionValue(string _currencyFrom, string _currencyTo) internal returns (uint) {
  //   // TODO: get value of correct currency
  //   uint value = getLatestPrice();
  //   return value;
  // }

  // function convert(uint _amountFrom, string _currencyFrom, string _currencyTo) internal returns (uint) {
  //   uint conversionValue = _getConversionValue(_currencyFrom, _currencyTo);
  //   uint convertAmount = conversionValue * _amountFrom;
  //   return convertAmount;
  // }

  // function createConversion(uint _startingAmount, string _startingCurrency, string _endingCurrency, uint _conversionFee, string _conversionFeeCurrency) public returns (uint) {
  //   uint conversionAmount = convert(_startingAmount, _startingCurrency, _endingCurrency);
  //   uint feeAmount = convert(_endingCurrency, _conversionFee, _conversionFeeCurrency);
  //   uint conversion = conversionAmount - feeAmount;
  //   return conversion;
  // }
}