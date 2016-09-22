const prepareReport = require('../../lib/report/prepareReport');
const assert = require('assert');
const td = require('testdouble');
const coMocha = require('co-mocha');

describe('prepareReport e2e', () => {
  it('[mocking library] reads file and parses symbols', function* () {
    const partitionResult = function(data) {
      assert.equal(data, 'data');
      return { results: 'success results', errors: 'error results' };
    };

    const prepareSuccessReport = function(success) {
      assert.equal(success, 'success results');
      return 'success';
    };


    const prepareErrorReport = function(errors) {
      assert.equal(errors, 'error results');
      return 'error';
    };

    const result = prepareReport({ partitionResult, prepareSuccessReport, prepareErrorReport })('data');

    // when
    assert.equal(result, 'successerror');
  });
});

