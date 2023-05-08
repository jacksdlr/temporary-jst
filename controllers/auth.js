const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      mesocycles: user.mesocycles,
      currentMeso: user.currentMeso,
      exercises: user.customExercises,
      stats: {
        height: user.height,
        weight: user.weight,
        age: user.age,
        activityLevel: user.activityLevel,
      },
      token,
    },
  });
};

const updateUser = async (req, res) => {
  const { name, email, height, weight, age, activityLevel } = req.body;
  if (!name || !email) {
    throw new BadRequestError('Name and email must be provided');
  }
  const user = await User.findOne({ _id: req.user.userId });

  // old + new password????

  user.name = name;
  user.email = email;
  user.height = height;
  user.weight = weight;
  user.age = age;
  user.activityLevel = activityLevel;

  await user.save();

  const token = user.createrJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      mesocycles: user.mesocycles,
      currentMeso: user.currentMeso,
      exercises: user.customExercises,
      stats: {
        height: user.height,
        weight: user.weight,
        age: user.age,
        activityLevel: user.activityLevel,
      },
      token,
    },
  });
};

module.exports = {
  register,
  login,
  updateUser,
};
