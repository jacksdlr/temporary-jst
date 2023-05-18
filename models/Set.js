const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  weight: {
    type: Number,
  },
  repetitions: {
    type: Number,
  },
  repsInReserve: {
    type: Number,
  },
  targetReps: {
    type: Number,
    required: true,
  },
  targetRIR: {
    type: Number,
    required: true,
  },
  notes: {
    type: Array,
    default: [],
  },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = { ExerciseSchema };
