const sort = require('./sortValues');

module.exports = (data) => {
  const result = sort(data).map(item => `${item.name}    ${item.data}`);

  return `Prices for ticker symbols:
${result.join('\n')}
`;
};
