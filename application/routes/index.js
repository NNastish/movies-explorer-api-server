const router = require('express').Router();
const { auth } = require('../middlewares/auth');

// unprotected routes (signup && signin)
router.use(require('./entranceRoute'));

// protecting other routes
router.use(auth);

// routing
router.use(require('./routeDistributor'));

module.exports = router;
