const mongoose = require('mongoose');
const { ExerciseSchema } = require('./Exercise');

const SessionSchema = new mongoose.Schema(
  {
    microcycle: {
      type: Number,
      required: true,
    },
    sessionName: {
      type: String,
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
      type: [ExerciseSchema],
      required: true,
    },
    notes: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      required: true,
      default: 'Planned',
      enum: ['Completed', 'Planned', 'Incomplete'],
    },
    dateCompleted: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model('Session', SessionSchema);

module.exports = { Session, SessionSchema };
