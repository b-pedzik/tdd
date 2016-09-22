const symbolsFetch = require('../../lib/file/symbolsFetch');
const assert = require('assert');
const td = require('testdouble');
const coMocha = require('co-mocha');

describe('symbolsFetch e2e', () => {
  it('[mocking library] reads file and parses symbols', function* () {
    const readFile = td.function('readFile');
    td.when(readFile('someFile')).thenReturn(Promise.resolve('A\nB\nC'));

    const parseSymbols = td.function('parseSymbols');
    td.when(parseSymbols('A\nB\nC')).thenReturn(['A', 'B', 'C']);

    const fetch = symbolsFetch({ readFile, parseSymbols });

    // when
    const symbols = yield fetch('someFile');
    assert.deepEqual(symbols, ['A', 'B', 'C']);
  });

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
