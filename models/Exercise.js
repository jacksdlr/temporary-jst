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
    required: true,
  },
  changeWeight: {
    type: String,
    enum: ['None', 'Increase', 'Decrease'],
  },
  performanceScore: {
    type: Number,
    min: 1,
    max: 4,
  },
  muscleGroup: {
    type: String,
    required: true,
  },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = { Exercise, ExerciseSchema };
