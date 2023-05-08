const mongoose = require('mongoose');

const MesocycleSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    startWeight: {
      type: Number,
      min: 2,
      max: 3,
    },
    endWeight: {
      type: Number,
      min: 2,
      max: 3,
    },
    microcycles: {
      type: Number,
      min: 1,
      max: 1,
    },
    notes: {
      type: Array,
      default: [],
    },
    sessions: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Mesocycle = mongoose.model('Mesocycle', MesocycleSchema);

module.exports = { MesocycleSchema };
