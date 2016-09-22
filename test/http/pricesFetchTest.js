const pricesFetch = require('../../lib/http/pricesFetch');
const assert = require('assert');
const td = require('testdouble');
const coMocha = require('co-mocha');

describe('pricesFetch e2e', () => {
  it('[mocking library] reads file and parses symbols', function* () {
    const readAllPrices = td.function('readAllPrices');
    td.when(readAllPrices(['A', 'B', 'C'])).thenReturn(Promise.resolve([{ name: 'A', data: 'response'}, { name: 'B', data: 'response' }, { name: 'C', data: 'response' }]));

    const parseCurrentPrices = td.function('parseCurrentPrices');
    td.when(parseCurrentPrices([{ name: 'A', data: 'response'}, { name: 'B', data: 'response' }, { name: 'C', data: 'response' }]))
    .thenReturn([{ name: 'A', data: 100}, { name: 'B', data: 100 }, { name: 'C', data: 100 }]);

    const fetch = pricesFetch({ readAllPrices, parseCurrentPrices });

    // when
    const symbols = yield fetch(['A', 'B', 'C']);
    assert.deepEqual(symbols, [{ name: 'A', data: 100}, { name: 'B', data: 100 }, { name: 'C', data: 100 }]);
  });
});
