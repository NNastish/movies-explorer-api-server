const router = require('express').Router();
const { signinValidation, signupValidation } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/usersController');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

module.exports = router;
