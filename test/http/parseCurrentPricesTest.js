const assert = require('assert');
const parseCurrentPrices = require('../../lib/http/parseCurrentPrices')();

describe('parse symbols', () => {
  it('[unit test] should get array', () => {
    const testItems = [{
      name: 'AAPL',
      data: `Date,Open,High,Low,Close,Volume,Adj Close
      2016-09-21,113.849998,113.989998,112.440002,113.550003,34686700,113.550003
      2016-09-20,113.050003,114.120003,112.510002,113.57,34514300,113.57
      2016-09-19,115.190002,116.18,113.25,113.580002,47023000,113.580002`
    }];

    const result = parseCurrentPrices(testItems);

    assert.deepEqual(result, [{ name: 'AAPL', data: '113.849998' }]);
  });

  it('[unit test] should get array', () => {
    const testItems = [];

    const result = parseCurrentPrices(testItems);

    assert.deepEqual(result, []);
  });

  it('[unit test] should get array', () => {
    const testItems = [{
      name: 'AAPL',
      data: `Date,Open,High,Low,Close,Volume,Adj Close
      2016-09-21,113.849998,113.989998,112.440002,113.550003,34686700,113.550003
      2016-09-20,113.050003,114.120003,112.510002,113.57,34514300,113.57
      2016-09-19,115.190002,116.18,113.25,113.580002,47023000,113.580002`
    }, {
      name: 'INVALID',
      data: 'Error'
    }];

    const result = parseCurrentPrices(testItems);

    assert.deepEqual(result, [{ name: 'AAPL', data: '113.849998' }, { name: 'INVALID', data: 'Error'}]);
  });

  it('[unit test] should get array', () => {
    const testItems = [{
      name: 'AAPL',
      data: 'Date,Open,High,Low,Close,Volume,Adj Close'
    }, {
      name: 'INVALID',
      data: 'Error'
    }];

    const result = parseCurrentPrices(testItems);

    assert.deepEqual(result, [{ name: 'AAPL', data: 'Error' }, { name: 'INVALID', data: 'Error'}]);
  });
});
