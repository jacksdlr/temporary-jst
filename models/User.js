const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { MesocycleSchema } = require('./Mesocycle');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    age: {
      type: Number,
    },
    sex: {
      type: String,
      enum: ['', 'Male', 'Female'],
    },
    activityLevel: {
      type: String,
      enum: [
        '',
        'Sedentary',
        'Lightly active',
        'Moderately active',
        'Active',
        'Very active',
      ],
    },
    customExercises: {
      type: Array,
      default: [],
    },
    mesocycles: [MesocycleSchema],
    currentMeso: {
      type: String,
      ref: 'Mesocycle',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePassword = function (userPassword) {
  return bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
