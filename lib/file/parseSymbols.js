module.exports = () => symbols => symbols.split('\n')
  .map(val => val === val.trim() ? val : '')
  .filter(val => val);
