const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: true,
  },
  sets: {
    type: Array,
    default: [],
    required: true,
  },
  currentSet: {
    type: mongoose.Types.ObjectId,
    ref: 'Set',
  },
  notes: {
    type: Array,
    default: [],
  },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = { ExerciseSchema };
