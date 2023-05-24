const mongoose = require('mongoose');
const { SessionSchema } = require('./Session');

const MesocycleSchema = new mongoose.Schema(
  {
    mesoName: {
      type: String,
      min: 1,
      max: 50,
      required: true,
    },
    microcycles: {
      type: Number,
      min: 1,
      max: 8,
      required: true,
    },
    goal: {
      type: String,
      enum: ['Bulk', 'Cut', 'Maintenance'],
    },
    startDate: {
      type: Date,
    },
    startWeight: {
      type: Number,
    },
    endWeight: {
      type: Number,
    },
    sessions: [SessionSchema],
    currentSession: {
      type: String,
      ref: 'Session',
    },
    notes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Mesocycle = mongoose.model('Mesocycle', MesocycleSchema);

module.exports = { Mesocycle, MesocycleSchema };
