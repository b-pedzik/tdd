const request = require('good-guy-http')();
const fs = require('fs');
const fileName = process.argv[2];

const fetchValues = name => request('http://ichart.finance.yahoo.com/table.csv?s=' + name)
  .then(req => Promise.resolve({ name, data: req.body }))
  .catch(() => Promise.resolve({ name, data: 'Error' }));

const sortValues = (val1, val2) => +val1.value < +val2.value;
const displayItem = item => console.log(`${item.name} ${item.data}`);

fs.readFile(fileName, 'utf8', (err, data) => {
  const arr = data.split('\n');
  const promises = arr.map(fetchValues);

  Promise.all(promises).then(data => {
    data.map((item) => {

      if (item.data !== 'Error')
        item.data = item.data.split('\n')[1].split(',')[1];

      return item;
    })
    .sort(sortValues)
    .forEach(displayItem);

  }).catch(err => { console.log(err)});
});