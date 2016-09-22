module.exports = items => {
  const errors = items.filter(item => item.data === 'Error');
  const results = items.filter(item => item.data !== 'Error');

  return {
    results,
    errors
  };
};
