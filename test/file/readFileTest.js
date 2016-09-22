const assert = require('assert');
const readFile = require('../../lib/file/readFile');
const coMocha = require('co-mocha');

describe('read file', () => {
  it('[integration test] should get file content', function* () {
    const read = readFile();

    const result = yield read('./input');

    assert.equal(result, 'GOOG\nAAPL\nORCL\nMSFT\nINVALID');
  });

  it('[integration test] should fail on nonexistent file', function* () {
    const read = readFile();

    try {
      yield read('./symbols_invalid');
      throw 'Should fail on nonesistent file';
    } catch (e) {
      assert.equal(e, 'Cannot read file ./symbols_invalid');
    }
  });
});
