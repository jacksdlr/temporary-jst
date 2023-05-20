const mongoose = require('mongoose');

const MesocycleSchema = new mongoose.Schema(
  {
    mesoName: {
      type: Number,
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
