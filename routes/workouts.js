const express = require('express');

const router = express.Router();
const {
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  getCurrentWorkout,
} = require('../controllers/workouts');
const authenticateUser = require('../middleware/authentication');

router.route('/', authenticateUser).get(getAllWorkouts);

router.route('/currentWorkout', authenticateUser).get(getCurrentWorkout);

router.route('/:id', authenticateUser).get(getWorkout);

router.route('/:mesoId/:workoutId', authenticateUser).delete(deleteWorkout);

module.exports = router;
