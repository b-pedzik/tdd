const symbolsFetch = require('../../lib/file/symbolsFetch');
const assert = require('assert');
const coMocha = require('co-mocha');

describe('symbolsFetch e2e', () => {
  it('read file and parses symbold', function* () {
    // given
    let expectedAssertionCount = 0;

    const readFile = fileName => {
      expectedAssertionCount++;
      assert.equal(fileName, 'someFile');
      return Promise.resolve('A\nB\nC');
    };

    const parseSymbols = symbols => {
      expectedAssertionCount++;
      assert.equal(symbols, 'A\nB\nC');
      return ['A', 'B', 'C'];
    };

    const fetch = symbolsFetch({ readFile, parseSymbols });

    // when
    const symbols = yield fetch('someFile');

    // then
    assert.deepEqual(symbols, ['A', 'B', 'C']);
    expectedAssertionCount++;
    assert.equal(expectedAssertionCount, 3, 'expected number of assertions');
  });
});
