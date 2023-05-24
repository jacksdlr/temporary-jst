const express = require('express');

const router = express.Router();
const { createMeso } = require('../controllers/mesocycles');

router.route('/').post(createMeso);

module.exports = router;
