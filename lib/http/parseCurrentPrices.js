module.exports = () => data => data.map((item) => {
  try {
    item.data = item.data.split('\n')[1].split(',')[1];
  } catch (e) {
    item.data = 'Error';
  }

  return item;
});
