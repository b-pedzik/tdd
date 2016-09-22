const assert = require('assert');
const coMocha = require('co-mocha');
const prepareErrorReport = require('../../lib/report/prepareErrorReport');

describe('error test', () => {
  it('[unit test] should get array', () => {
    const testItems = [
      { name: 'INVALID', data: 'Error' }
    ];

    const result = prepareErrorReport(testItems);
    assert.equal(result, `Ticker symbols with error:
INVALID Error`);
  });
});
