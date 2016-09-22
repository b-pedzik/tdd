
module.exports = ({ request }) => symbols => Promise.all(
  symbols.map(
    name => request('http://ichart.finance.yahoo.com/table.csv?s=' + name)
      .then(req => Promise.resolve({ name, data: req.body }))
      .catch(() => Promise.resolve({ name, data: 'Error' }))
  )
);
