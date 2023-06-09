const express = require('express');
const {
  register,
  login,
  updateUserDetails,
  updateUserData,
} = require('../controllers/user');
const authenticateUser = require('../middleware/authentication');
const testUser = require('../middleware/test-user');

const router = express.Router();

const rateLimiter = require('express-rate-limit');
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: {
    msg: 'You have sent too many requests, please try again in 5 minutes.',
  },
});

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);

router.patch(
  '/updateUserDetails',
  authenticateUser,
  testUser,
  updateUserDetails
);
router.patch('/updateUserData', authenticateUser, testUser, updateUserData);

module.exports = router;
