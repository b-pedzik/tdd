module.exports = () => symbols => symbols.split('\n')
  .filter(val => {
    const trimmed = val.trim();
    return trimmed === val && trimmed;
  });
