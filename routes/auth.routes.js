const express = require('express');
const { registerUser, loginUser, getUsers } = require('../controllers/auth.controller');
const admin = require('../middleware/admin.middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', admin, getUsers);

module.exports = router;