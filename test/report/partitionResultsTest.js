const assert = require('assert');
const coMocha = require('co-mocha');
const partitionResults = require('../../lib/report/partitionResults');

describe('parition results test', () => {
  it('[unit test] should get array', () => {
    const testItems = [
      { name: 'GOOG', data: 200 },
      { name: 'AAPL', data: 200 },
      { name: 'INVALID', data: 'Error' }
    ];

    const result = partitionResults(testItems);

    assert.deepEqual(result, {
      results: [
        { name: 'GOOG', data: 200 },
        { name: 'AAPL', data: 200 }
      ],
      errors: [
        { name: 'INVALID', data: 'Error' }
      ]
    });
  });

  it('[unit test] should get array', () => {
    const testItems = [
      { name: 'GOOG', data: 200 },
      { name: 'AAPL', data: 200 }
    ];

    const result = partitionResults(testItems);

    assert.deepEqual(result, {
      results: [
        { name: 'GOOG', data: 200 },
        { name: 'AAPL', data: 200 }
      ],
      errors: []
    });
  });

  it('[unit test] should get array', () => {
    const testItems = [

      { name: 'INVALID', data: 'Error' }
    ];

    const result = partitionResults(testItems);

    assert.deepEqual(result, {
      results: [],
      errors: [
        { name: 'INVALID', data: 'Error' }
      ]
    });
  });
});
