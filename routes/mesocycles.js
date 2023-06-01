const express = require('express');

const router = express.Router();
const {
  getAllMesocycles,
  createMeso,
  updateMeso,
} = require('../controllers/mesocycles');

router.route('/').get(getAllMesocycles).post(createMeso);
router.route('/:mesoId').patch(updateMeso);

module.exports = router;
