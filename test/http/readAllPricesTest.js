const assert = require('assert');
const readAllPrices = require('../../lib/http/readAllPrices');
const coMocha = require('co-mocha');
const td = require('testdouble');

describe('read file', () => {
  it.skip('[integration test] should get file content', function* () {
    const request = require('good-guy-http')();
    const read = readAllPrices({ request });

    const result = yield read(['GOOG', 'AAPL']);

    assert.deepEqual(result, [{ name: 'GOOG', data: 200 }, { name: 'AAPL', data: 200 }]);
  });

  it('[unit test] should get file content', function* () {
    const request = (url) => Promise.resolve({ body: 200 });
    const read = readAllPrices({ request });

    const result = yield read(['GOOG', 'AAPL']);

    assert.deepEqual(result, [{ name: 'GOOG', data: 200 }, { name: 'AAPL', data: 200 }]);
  });

  // it('[unit test with mocking library] should get file content', function* () {
  //   const request = td.object();
  //   td.when(fs.readAllPrices('./input', 'utf8')).thenCallback(null, 'content');
  // 
  //   const read = readAllPrices({ request });
  // 
  //   const result = yield read('./input');
  // 
  //   assert.equal(result, 'content');
  // });
  // 
  it.skip('[integration test] should fail on nonexistent file', function* () {
    const request = require('good-guy-http')();
    const read = readAllPrices({ request });

    const result = yield read(['GOOG', 'AAPL', 'INVALID']);

    assert.deepEqual(result, [{ name: 'GOOG', data: 200 }, { name: 'AAPL', data: 200 }, { name: 'INVALID', data: 'Error' }]);
  });

  it('[unit test] should fail on nonexistent file', function* () {
    const request = (url) => url.endsWith('INVALID') ? Promise.resolve({ body: 'Error' }) : Promise.resolve({ body: 200 });
    const read = readAllPrices({ request });

    const result = yield read(['GOOG', 'AAPL', 'INVALID']);

    assert.deepEqual(result, [{ name: 'GOOG', data: 200 }, { name: 'AAPL', data: 200 }, { name: 'INVALID', data: 'Error' }]);
  });

  // it('[unit test] should fail on nonexistent file', function* () {
  //   const request = td.object();
  //   td.when(fs.readAllPrices('./symbols_invalid', 'utf8')).thenCallback('Cannot read file ./symbols_invalid', null);
  //   const read = readAllPrices({ request });
  // 
  //   try {
  //     yield read('./symbols_invalid');
  //     throw 'Should fail on nonesistent file';
  //   } catch (e) {
  //     assert.equal(e, 'Cannot read file ./symbols_invalid');
  //   }
  // });
});
