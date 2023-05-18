const express = require('express');

const router = express.Router();
const { getWorkout } = require('../controllers/workouts');

router.route('/');

router.route('/:id').get(getWorkout);

module.exports = router;
