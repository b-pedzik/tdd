const assert = require('assert');
const coMocha = require('co-mocha');
const parseSymbols = require('../../lib/file/parseSymbols')();

describe('parse symbols', () => {
  it('[unit test] should get array', () => {
    const testText = 'GOOG\nAAPL';

    const result = parseSymbols(testText);

    assert.deepEqual(result, ['GOOG', 'AAPL']);
  });

  it('[unit test] should get array', () => {
    const testText = '';

    const result = parseSymbols(testText);

    assert.deepEqual(result, []);
  });

  it('[unit test] should get array', () => {
    const testText = '     ';

    const result = parseSymbols(testText);

    assert.deepEqual(result, []);
  });

  it('[unit test] should get array', () => {
    const testText = 'AAPL       \nGOOG\n\n';

    const result = parseSymbols(testText);

    assert.deepEqual(result, ['GOOG']);
  });
});
