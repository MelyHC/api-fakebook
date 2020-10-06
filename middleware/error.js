const codeError = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  500: 'Internal server error',
};

const verifyStatusError = (num) => (
  typeof num === 'number' && Object.keys(codeError).indexOf(`${num}`) >= 0
);

module.exports = (err, req, res, callback) => {
  const codeStatus = (verifyStatusError(err))
    ? err
    : err.codeStatus || 500;
  const message = err.message || codeError[codeStatus] || err;

  if (codeStatus === 500) {
    console.error(codeStatus, message);
  }

  res.status(codeStatus).json({ codeStatus, message });
  callback();
};
