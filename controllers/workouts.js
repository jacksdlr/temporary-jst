const { User } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const { userObject } = require('./user');

const getAllWorkouts = async (req, res) => {
  const { mesoId, microcycle, session, status, muscle, sort, page } = req.query;

  let user = await User.aggregate([
    { $match: { _id: ObjectId(req.user.userId) } },
    {
      $unwind: '$mesocycles',
    },
    mesoId != undefined
      ? { $match: { 'mesocycles._id': ObjectId(mesoId) } }
      : { $match: {} },
    { $unwind: '$mesocycles.sessions' },
    microcycle != undefined
      ? { $match: { 'mesocycles.sessions.microcycle': Number(microcycle) } }
      : { $match: {} },
    session != undefined
      ? { $match: { 'mesocycles.sessions.sessionNumber': Number(session) } }
      : { $match: {} },
    status != 'All'
      ? { $match: { 'mesocycles.sessions.status': status } }
      : { $match: {} },
    muscle != 'All'
      ? { $match: { 'mesocycles.sessions.musclesTrained': muscle } }
      : { $match: {} },
  ]);

  let result = await User.aggregate([
    { $match: { _id: ObjectId(req.user.userId) } },
    {
      $unwind: '$mesocycles',
    },
    mesoId != undefined
      ? { $match: { 'mesocycles._id': ObjectId(mesoId) } }
      : { $match: {} },
    { $unwind: '$mesocycles.sessions' },
    microcycle != undefined
      ? { $match: { 'mesocycles.sessions.microcycle': Number(microcycle) } }
      : { $match: {} },
    session != undefined
      ? { $match: { 'mesocycles.sessions.sessionNumber': Number(session) } }
      : { $match: {} },
    status != 'All'
      ? { $match: { 'mesocycles.sessions.status': status } }
      : { $match: {} },
    muscle != 'All'
      ? { $match: { 'mesocycles.sessions.musclesTrained': muscle } }
      : { $match: {} },
    sort == 'Last Updated'
      ? { $sort: { 'mesocycles.sessions.updatedAt': -1 } }
      : sort == 'Oldest'
      ? { $sort: { 'mesocycles.sessions.updatedAt': 1 } }
      : { $match: {} },
    page != undefined ? { $skip: (Number(page) - 1) * 8 } : { $skip: 0 },
    { $limit: 8 },
  ]);

  if (!user) {
    throw new NotFoundError(`No workouts found`);
  }

  const totalWorkouts = user.length;
  const numberOfPages = Math.ceil(totalWorkouts / 8);

  const workouts = [];
  result.forEach((item) => {
    return workouts.push({
      mesoName: item.mesocycles.mesoName,
      mesoId: item.mesocycles._id,
      ...item.mesocycles.sessions,
    });
  });

  res.status(StatusCodes.OK).json({ workouts, totalWorkouts, numberOfPages });
};

const getNextWorkout = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findById(userId);
  const activeMeso = await user.mesocycles.find(
    (meso) => meso.status == 'Active'
  );

  if (!activeMeso) {
    return res
      .status(StatusCodes.OK)
      .json({ msg: `You do not have an active mesocycle` });
  }

  const workout = await activeMeso.sessions.find(
    (session) => session.status == 'Planned'
  );

  res.status(StatusCodes.OK).json({ workout, mesoId: activeMeso._id });
};

// This is for individual workout route (like current workout, when user clicks to view/edit in all-workouts it brings them to workout page)
const getWorkout = async (req, res) => {
  const {
    user: { userId },
    params: { mesoId, workoutId },
  } = req;

  const user = await User.findById(userId);
  /* const workout = await user.mesocycles.map((mesocycle) =>
    mesocycle.sessions.find((session) => session._id === workoutId)
  ); */
  const meso = user.mesocycles.find((mesocycle) => mesocycle._id == mesoId);

  const workout = meso.sessions.find((session) => session._id == workoutId);

  if (!workout) {
    throw new NotFoundError(`No workout with id ${workoutId}`);
  }
  res.status(StatusCodes.OK).json({ workout, mesoId });
};

const updateWorkout = async (req, res) => {
  const {
    user: { userId },
    params: { mesoId, workoutId },
  } = req;

  const user = await User.findById(userId);

  const meso = user.mesocycles.find((mesocycle) => mesocycle._id == mesoId);

  let workout = meso.sessions.find((session) => session._id == workoutId);

  if (!workout) {
    throw new NotFoundError(`No workout with id ${workoutId}`);
  }

  workout.exercises = req.body.exercises;

  // THIS WORKS ^^^^^ PAGBOUNCE

  await user.save();

  res.status(StatusCodes.OK).json({
    user: userObject(user),
  });
};

const deleteWorkout = async (req, res) => {
  const {
    user: { userId },
    params: { mesoId, workoutId },
  } = req;

  const user = await User.findById(userId);

  const meso = user.mesocycles.find((mesocycle) => mesocycle._id == mesoId);

  const session = meso.sessions.find((session) => session._id == workoutId);

  session.length == 1 ? meso.remove() : session.remove();
  await user.save();

  res.status(StatusCodes.OK).json({
    user: userObject(user),
  });
};

module.exports = {
  getAllWorkouts,
  getNextWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
};
