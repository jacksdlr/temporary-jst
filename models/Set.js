const mongoose = require('mongoose');

const SetSchema = new mongoose.Schema({
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
  /* notes: {
    type: Array,
    default: [],
  }, */
  /* changeWeight: {
    type: String,
    enum: ['None', 'Increase', 'Decrease'],
  }, */
});

const Set = mongoose.model('Set', SetSchema);

module.exports = { Set, SetSchema };
