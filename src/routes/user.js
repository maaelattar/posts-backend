const express = require('express');

const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', checkAuth, userController.getUser);
router.post('/login', userController.userLogin);

module.exports = router;
