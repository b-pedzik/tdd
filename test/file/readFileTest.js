const assert = require('assert');
const readFile = require('../../lib/file/readFile');
const coMocha = require('co-mocha');
const td = require('testdouble');

describe('read file', () => {
  it('[integration test] should get file content', function* () {
    const fs = require('fs');
    const read = readFile({ fs });

    const result = yield read('./input');

    assert.equal(result, 'GOOG\nAAPL\nORCL\nMSFT\nINVALID');
  });

  it('[unit test] should get file content', function* () {
    const fs = {
      readFile(fileName, encoding, callback) {
        assert.equal(fileName, './input');
        assert.equal(encoding, 'utf8');
        callback(null, 'content');
      }
    };
    const read = readFile({ fs });

    const result = yield read('./input');

    assert.equal(result, 'content');
  });

  it('[unit test with mocking library] should get file content', function* () {
    const fs = td.object();
    td.when(fs.readFile('./input', 'utf8')).thenCallback(null, 'content');

    const read = readFile({ fs });

    const result = yield read('./input');

    assert.equal(result, 'content');
  });

  it('[integration test] should fail on nonexistent file', function* () {
    const fs = require('fs');
    const read = readFile({ fs });

    try {
      yield read('./symbols_invalid');
      throw 'Should fail on nonesistent file';
    } catch (e) {
      assert.equal(e, 'Cannot read file ./symbols_invalid');
    }
  });

  it('[unit test] should fail on nonexistent file', function* () {
    const fs = {
      readFile(fileName, encoding, callback) {
        assert.equal(fileName, './symbols_invalid');
        assert.equal(encoding, 'utf8');
        callback('Cannot read file ./symbols_invalid', null);
      }
    };
    const read = readFile({ fs });

    try {
      yield read('./symbols_invalid');
      throw 'Should fail on nonesistent file';
    } catch (e) {
      assert.equal(e, 'Cannot read file ./symbols_invalid');
    }
  });

  it('[unit test] should fail on nonexistent file', function* () {
    const fs = td.object();
    td.when(fs.readFile('./symbols_invalid', 'utf8')).thenCallback('Cannot read file ./symbols_invalid', null);
    const read = readFile({ fs });

    try {
      yield read('./symbols_invalid');
      throw 'Should fail on nonesistent file';
    } catch (e) {
      assert.equal(e, 'Cannot read file ./symbols_invalid');
    }
  });
});
