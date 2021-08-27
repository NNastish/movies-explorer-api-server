// FIXME: add extra domains
const ALLOWED_CORS = process.env.ALLOWED_CORS ? process.env.ALLOWED_CORS.split(', ') : [
  'http://localhost:3000',
  'https://localhost:3000',
  'https://movies-explore.nomoredomains.monster',
  'http://movies-explore.nomoredomains.monster',
];

const DEFAULT_ALLOWED_METHODS = 'GET,PATCH,POST,DELETE';

module.exports.checkCors = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;

  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};
