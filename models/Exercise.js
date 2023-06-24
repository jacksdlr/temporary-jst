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
  repRange: {
    type: String,
  },
  changeWeight: {
    type: String,
    enum: ['None', 'Increase', 'Decrease'],
  },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = { Exercise, ExerciseSchema };
