const request = require('good-guy-http')();
const fs = require('fs');
const fileNameArg = process.argv[2];

const symbolsFetch = require('./lib/file/symbolsFetch');
const readFile = require('./lib/file/readFile')({ fs });
const parseSymbols = require('./lib/file/parseSymbols')();

const fetchSymbols = symbolsFetch({ readFile, parseSymbols });

const pricesFetch = require('./lib/http/pricesFetch');
const readAllPrices = require('./lib/http/readAllPrices')({ request });
const parseCurrentPrices = require('./lib/http/parseCurrentPrices')();

const fetchPrices = pricesFetch({ readAllPrices, parseCurrentPrices });

const prepareReport = require('./lib/report/prepareReport');
const partitionResult = require('./lib/report/partitionResults');
const prepareErrorReport = require('./lib/report/prepareErrorReport');
const prepareSuccessReport = require('./lib/report/prepareSuccessReport');

const pr = prepareReport({ partitionResult, prepareSuccessReport, prepareErrorReport });

const stockFetch = require('./lib/stockFetch');

stockFetch({ fetchSymbols, fetchPrices, prepareReport: pr })(fileNameArg)
.then(data => console.log(data));
