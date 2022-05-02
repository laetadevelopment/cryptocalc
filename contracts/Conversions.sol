// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract Conversions {
  AggregatorV3Interface internal priceFeed;

  constructor() public {
    priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
  }

  function _getLatestPrice() internal returns (int) {
    (,int price,,,) = priceFeed.latestRoundData();
    return price;
  }

  function _getDecimals() internal returns (uint8) {
    uint8 decimals = priceFeed.decimals();
    return decimals;
  }

  function _getConversionValue(string _currencyFrom, string _currencyTo) internal returns (uint) {
    // TODO: get value of correct currency
    uint value = _getLatestPrice();
    return value;
  }

  function convert(uint _amountFrom, string _currencyFrom, string _currencyTo) internal returns (uint) {
    uint conversionValue = _getConversionValue(_currencyFrom, _currencyTo);
    uint convertAmount = conversionValue * _amountFrom;
    return convertAmount;
  }

  function createConversion(uint _startingAmount, string _startingCurrency, string _endingCurrency, uint _conversionFee, string _conversionFeeCurrency) public returns (uint) {
    uint conversionAmount = convert(_startingAmount, _startingCurrency, _endingCurrency);
    uint feeAmount = convert(_endingCurrency, _conversionFee, _conversionFeeCurrency);
    uint conversion = conversionAmount - feeAmount;
    return conversion;
  }
}
