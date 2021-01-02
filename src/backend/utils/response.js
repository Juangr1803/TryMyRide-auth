exports.success = (req, res, data, status, message) => {
  res.status(status || 200).json({
    error: '',
    body: data,
    message,
  });
};

exports.error = (req, res, data, status, details) => {
  console.log(`[response.error] ${details}`);

  res.status(status || 500).json({
    error: data,
    body: '',
  });
};
