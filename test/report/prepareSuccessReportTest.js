const assert = require('assert');
const coMocha = require('co-mocha');
const prepareSuccessReport = require('../../lib/report/prepareSuccessReport');

describe('success report test', () => {
  it('[unit test] should get array', () => {
    const testItems = [
      { name: 'GOOG', data: 100 },
      { name: 'AAPL', data: 200 }
    ];

    const result = prepareSuccessReport(testItems);
    assert.equal(result, `Prices for ticker symbols:
AAPL    200
GOOG    100
`);
  });
});
