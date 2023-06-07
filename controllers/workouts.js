const { User } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const { userObject } = require('./user');

const getAllWorkouts = async (req, res) => {
  const {
    mesoId,
    sessionName,
    microcycle,
    session,
    status,
    muscle,
    sort,
    page,
  } = req.query;

  let user = await User.aggregate([
    { $match: { _id: ObjectId(req.user.userId) } },
    {
      $unwind: '$mesocycles',
    },
    mesoId != undefined
      ? { $match: { 'mesocycles._id': ObjectId(mesoId) } }
      : { $match: {} },
    { $unwind: '$mesocycles.sessions' },
    sessionName != undefined
      ? { $match: { 'mesocycles.sessions.sessionName': sessionName } }
      : { $match: {} },
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
    sessionName != undefined
      ? { $match: { 'mesocycles.sessions.sessionName': sessionName } }
      : { $match: {} },
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
    page != undefined ? { $skip: (Number(page) - 1) * 8 } : { $skip: 0 },
    { $limit: 8 },
  ]);

  if (!user) {
    throw new NotFoundError(`No workouts found`);
  }

  const totalWorkouts = user.length;
  const numberOfPages = Math.ceil(totalWorkouts / 8);

  // const page = Number(req.query.page) || 1;
  // const skip = (page - 1) * 10;

  // user = user.skip(skip).limit(10);

  const workouts = [];
  result.forEach((item) => {
    return workouts.push({
      mesoName: item.mesocycles.mesoName,
      mesoId: item.mesocycles._id,
      ...item.mesocycles.sessions,
    });
  });
  /* if (workouts.length === 0) {
    throw new NotFoundError(`No workouts found`);
  } */

  /*

  user.mesocycles.map((meso) =>
    meso.sessions.map((session) => {
      return allWorkouts.push({
        mesoName: meso.mesoName,
        ...session,
      });
    })
  );
*/

  // this will be where they get filtered

  res.status(StatusCodes.OK).json({ workouts, totalWorkouts, numberOfPages });
};

const getCurrentWorkout = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findById(userId);
  const activeMeso = await user.mesocycles.find(
    (meso) => meso.status == 'Active'
  );

  if (!activeMeso) {
    return res
      .status(StatusCodes.OK)
      .json({ msg: `You do not have an active mesocycle` });

    // throw new NotFoundError(`You do not have an active mesocycle`);
  }

  const workout = await activeMeso.sessions.find(
    (session) => session.status == 'Planned'
  );

  res.status(StatusCodes.OK).json({ workout });
};

// This is for individual workout route (like current workout, when user clicks to view/edit in all-workouts it brings them to workout page)
const getWorkout = async (req, res) => {
  const {
    user: { userId },
    params: { id: workoutId },
  } = req;

  const user = await User.findById(userId);
  const workout = await user.mesocycles.map((mesocycle) =>
    mesocycle.sessions.find((session) => session._id === workoutId)
  );
  if (!workout) {
    throw new NotFoundError(`No workout with id ${workoutId}`);
  }
  res.status(StatusCodes.OK).json({ workout });
};

const deleteWorkout = async (req, res) => {
  const {
    user: { userId },
    params: { mesoId, workoutId },
  } = req;

  const user = await User.findById(userId);

  /* const workout = (
    await User.aggregate([
      { $match: { _id: ObjectId(userId) } },
      {
        $unwind: '$mesocycles',
      },
      { $unwind: '$mesocycles.sessions' },

      { $match: { 'mesocycles.sessions._id': ObjectId(workoutId) } },
    ])
  )[0];

  const mesoId = workout.mesocycles._id.toString();
  const sessionId = workout.mesocycles.sessions._id.toString(); */

  const mesoIndex = user.mesocycles.findIndex(
    (mesocycle) => mesocycle._id == mesoId
  );

  const sessionIndex = user.mesocycles[mesoIndex].sessions.findIndex(
    (session) => session._id == workoutId
  );

  user.mesocycles[mesoIndex].sessions.length == 1
    ? user.mesocycles[mesoIndex].remove()
    : user.mesocycles[mesoIndex].sessions[sessionIndex].remove();
  await user.save();

  // const token = user.createJWT();

  // console.log(workout);
  /* workout.mesocycles.sessions.remove();
  workout.save();
 */
  // if (!workout) {
  //   throw new NotFoundError(`No workout with id ${workoutId}`);
  // }
  // const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: userObject(user),
  });
};

/* const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
}; */

module.exports = {
  getAllWorkouts,
  getCurrentWorkout,
  getWorkout,
  deleteWorkout,
};
