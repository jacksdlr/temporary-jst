const express = require('express');

const router = express.Router();
const { getAllMesocycles, createMeso } = require('../controllers/mesocycles');

router.route('/').get(getAllMesocycles).post(createMeso);

module.exports = router;
