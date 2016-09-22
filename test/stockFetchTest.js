const stockFetch = require('../lib/stockFetch');
const assert = require('assert');
const coMocha = require('co-mocha');

describe('stockFetch e2e', () => {
  it('happy path', function* () {
    // given
    let expectedAssertionCount = 0;

    const fetchSymbols = fileName => {
      expectedAssertionCount++;
      assert.equal(fileName, 'someFile');
      return Promise.resolve(['A', 'B']);
    };

    const fetchPrices = symbols => {
      expectedAssertionCount++;
      assert.deepEqual(symbols, ['A', 'B']);
      return Promise.resolve([{ name: 'A', data: 10}, { name: 'B', data: 20 }]);
    };

    const prepareReport = symbolsAndPrices => {
      expectedAssertionCount++;
      assert.deepEqual(symbolsAndPrices, [{ name: 'A', data: 10}, { name: 'B', data: 20 }]);
      return 'report';
    };

    const fetch = stockFetch({ fetchSymbols, fetchPrices, prepareReport });

    // when
    const report = yield fetch('someFile');

    // then
    assert.equal(report, 'report');
    expectedAssertionCount++;
    assert.equal(expectedAssertionCount, 4, 'expected number of assertions');
  });
});
