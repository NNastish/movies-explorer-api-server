const router = require('express').Router();
const { updateUserValidation } = require('../middlewares/validation');

const { getUserInfo, updateUser } = require('../controllers/usersController');

router.get('/me', getUserInfo);
router.patch('/me', updateUserValidation, updateUser);

module.exports = router;
