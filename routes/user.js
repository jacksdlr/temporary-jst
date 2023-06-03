const express = require('express');
const {
  register,
  login,
  updateUserDetails,
  updateUserData,
} = require('../controllers/user');
const authenticateUser = require('../middleware/authentication');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.patch('/updateUserDetails', authenticateUser, updateUserDetails);
router.patch('/updateUserData', authenticateUser, updateUserData);

module.exports = router;
