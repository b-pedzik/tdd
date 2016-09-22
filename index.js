const request = require('good-guy-http')();
const fs = require('fs');
const fileNameArg = process.argv[2];

const readFile = fileName => new Promise((resolve) => {
  fs.readFile(fileName, 'utf8', (error, data) => resolve(data));
});

const parseSymbols = symbols => symbols.split('\n');

const fetchValues = symbols => Promise.all(
  symbols.map(
    name => request('http://ichart.finance.yahoo.com/table.csv?s=' + name)
      .then(req => Promise.resolve({ name, data: req.body }))
      .catch(() => Promise.resolve({ name, data: 'Error' }))
  )
);

const readResponseValue = data => data.map((item) => {
  if (item.data !== 'Error') {
    item.data = item.data.split('\n')[1].split(',')[1];
  }

  return item;
});

const sortValues = values => values.sort((val1, val2) => +val1.value < +val2.value);

const returnValue = data => data.map(item => `${item.name} ${item.data}`).join('\n');

readFile(fileNameArg)
.then(parseSymbols)
.then(fetchValues)
.then(readResponseValue)
.then(sortValues)
.then(returnValue)
.then(data => console.log(data));
