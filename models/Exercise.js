const mongoose = require('mongoose');
const { SetSchema } = require('./Set');

const ExerciseSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: true,
  },
  sets: {
    type: [SetSchema],
    required: true,
  },
  notes: {
    type: Array,
    default: [],
  },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = { Exercise, ExerciseSchema };
