const express = require('express');

const router = express.Router();
const {
  getAllMesocycles,
  createMeso,
  updateMeso,
  deleteMeso,
} = require('../controllers/mesocycles');
const authenticateUser = require('../middleware/authentication');
const testUser = require('../middleware/test-user');

router
  .route('/', authenticateUser)
  .get(getAllMesocycles)
  .post(testUser, createMeso);
router
  .route('/:mesoId', authenticateUser)
  .patch(testUser, updateMeso)
  .delete(testUser, deleteMeso);

module.exports = router;
