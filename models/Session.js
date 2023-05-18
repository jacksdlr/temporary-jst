const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema(
  {
    microcycle: {
      type: Number,
      required: true,
    },
    sessionNumber: {
      type: Number,
      required: true,
    },
    musclesTrained: {
      type: Array,
      default: [],
      required: true,
    },
    exercises: {
      type: Array,
      default: [],
      required: true,
    },
    /* currentExercise: {
      type: mongoose.Types.ObjectId,
      ref: 'Exercise',
    }, */
    notes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Session = mongoose.model('Session', SessionSchema);

module.exports = { SessionSchema };
