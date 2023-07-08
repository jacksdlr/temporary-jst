const express = require('express');

const router = express.Router();
const {
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  getNextWorkout,
  updateWorkout,
} = require('../controllers/workouts');
const authenticateUser = require('../middleware/authentication');
const testUser = require('../middleware/test-user');

router.route('/', authenticateUser).get(getAllWorkouts);

router
  .route('/:mesoId/:workoutId', authenticateUser)
  .get(getWorkout)
  .patch(testUser, updateWorkout)
  .delete(testUser, deleteWorkout);

module.exports = router;
