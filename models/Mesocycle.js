const mongoose = require('mongoose');

const MesocycleSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    startWeight: {
      type: Number,
    },
    endWeight: {
      type: Number,
    },
    goal: {
      type: String,
      enum: ['Bulk', 'Cut', 'Maintenance'],
    },
    microcycles: {
      type: Number,
      min: 1,
      max: 8,
      required: true,
    },
    sessions: {
      type: Array,
      default: [],
    },
    currentSession: {
      type: mongoose.Types.ObjectId,
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

module.exports = { MesocycleSchema };
