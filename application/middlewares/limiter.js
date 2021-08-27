const rateLimit = require('express-rate-limit');
const { queryLimitExceedError } = require('../constants');

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: queryLimitExceedError,
});

module.exports = {
  globalLimiter,
};
