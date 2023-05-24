const express = require('express');

const router = express.Router();
const {
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
} = require('../controllers/workouts');

router.route('/').get(getAllWorkouts);

router.route('/:id').get(getWorkout).delete(deleteWorkout);

module.exports = router;
