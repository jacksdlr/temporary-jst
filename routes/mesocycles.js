const express = require('express');

const router = express.Router();
const {
  getAllMesocycles,
  createMeso,
  updateMeso,
  deleteMeso,
} = require('../controllers/mesocycles');
const authenticateUser = require('../middleware/authentication');

router.route('/', authenticateUser).get(getAllMesocycles).post(createMeso);
router.route('/:mesoId', authenticateUser).patch(updateMeso).delete(deleteMeso);

module.exports = router;
