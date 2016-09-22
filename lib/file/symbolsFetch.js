
module.exports = ({ readFile, parseSymbols }) => {
  return (fileName) => {
    return readFile(fileName).then(parseSymbols);
  };
};
