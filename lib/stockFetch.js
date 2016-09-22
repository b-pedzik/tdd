
module.exports = ({ fetchSymbols, fetchPrices, prepareReport }) => (fileName) => fetchSymbols(fileName).then(fetchPrices).then(prepareReport);
