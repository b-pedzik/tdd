const assert = require('assert');
const coMocha = require('co-mocha');
const sortValues = require('../../lib/report/sortValues');

describe('sort result array', () => {
  it('[unit test] should get array', () => {
    const testItems = [
      { name: 'GOOG', data: 300 },
      { name: 'AAPL', data: 200 },
      { name: 'ASDF', data: 400 }
    ];

    const result = sortValues(testItems);

    assert.deepEqual(result, [
      { name: 'ASDF', data: 400 },
      { name: 'GOOG', data: 300 },
      { name: 'AAPL', data: 200 }
    ]);
  });
});
