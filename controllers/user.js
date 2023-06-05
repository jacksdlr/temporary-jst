const { User } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const userObject = (user) => {
  const token = user.createJWT();
  return {
    name: user.name,
    email: user.email,
    mesocycles: user.mesocycles,
    exercises: user.customExercises,
    data: {
      height: user.height,
      weight: user.weight,
      age: user.age,
      sex: user.sex,
      activityLevel: user.activityLevel,
    },
    stats: {
      completedWorkouts: user.mesocycles
        .map(
          (meso) =>
            meso.sessions.filter((session) => session.status == 'Completed')
              .length
        )
        .reduce((sum, next) => sum + next),
      totalMesocycles: user.mesocycles.length,
    },
    token,
  };
};

// Register user
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

// Login user
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
    user: userObject(user),
  });
};

// Update user name, email, password
const updateUserDetails = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new BadRequestError('Name and email must be provided');
  }
  const user = await User.findOne({ _id: req.user.userId });

  // old + new password????

  user.name = name;
  user.email = email;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: userObject(user),
  });
};

// Update user height, weight, age, and activity level
const updateUserData = async (req, res) => {
  const { height, weight, age, sex, activityLevel } = req.body;
  const user = await User.findOne({ _id: req.user.userId });

  user.height = height;
  user.weight = weight;
  user.age = age;
  user.sex = sex;
  user.activityLevel = activityLevel;

  await user.save();

  res.status(StatusCodes.OK).json({
    user: userObject(user),
  });
};

module.exports = {
  userObject,
  register,
  login,
  updateUserDetails,
  updateUserData,
};