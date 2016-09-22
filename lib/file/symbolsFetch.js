
module.exports = ({ readFile, parseSymbols }) => fileName => readFile(fileName).then(parseSymbols);
