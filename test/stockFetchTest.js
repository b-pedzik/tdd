const stockFetch = require('../lib/stockFetch');
const assert = require('assert');

describe('stockFetch e2e', (done) => {
  it('happy path', () => {
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
    const reportPromise = fetch('someFile');

    // then
    reportPromise.then(report => {
      assert.equal(report, 'report');
      expectedAssertionCount++;
      assert.equal(expectedAssertionCount, 3, 'expected number of assertions');
      done();
    }).catch(done);
  });
});
