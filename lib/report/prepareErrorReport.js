module.exports = (data) => {
  const result = data.map(item => `${item.name} ${item.data}`);

  return `Ticker symbols with error:
${result.join('\n')}`;
};
