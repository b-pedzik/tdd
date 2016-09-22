module.exports = ({ readAllPrices, parseCurrentPrices }) => (data) => readAllPrices(data).then(parseCurrentPrices);
