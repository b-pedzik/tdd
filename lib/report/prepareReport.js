
module.exports = ({ partitionResult, prepareSuccessReport, prepareErrorReport }) => data => {
  const res = partitionResult(data);
  return prepareSuccessReport(res.results) + prepareErrorReport(res.errors);
};
