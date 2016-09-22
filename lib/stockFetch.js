
module.exports = (fetchSymbols, fetchPrices, prepareReport) => {
  return (fileName) => {
    return fetchSymbols(fileName).then(fetchPrices).then(prepareReport);
  };
};
