const { User } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const { userObject } = require('./user');

const getAllWorkouts = async (req, res) => {
  const { status, mesoName, sessionName } = req.query;

  const user = await User.aggregate([
    { $match: { _id: ObjectId(req.user.userId) } },
    {
      $unwind: '$mesocycles',
    },
    mesoName != undefined
      ? { $match: { 'mesocycles.mesoName': mesoName } }
      : { $match: {} },
    { $unwind: '$mesocycles.sessions' },
    sessionName != undefined
      ? { $match: { 'mesocycles.sessions.sessionName': sessionName } }
      : { $match: {} },
  ]);

  if (!user) {
    throw new NotFoundError(`No workouts found`);
  }

  const allWorkouts = [];
  user.forEach((item) => {
    return allWorkouts.push({
      mesoName: item.mesocycles.mesoName,
      mesoId: item.mesocycles._id,
      ...item.mesocycles.sessions,
    });
  });

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
  let workouts = allWorkouts;

  if (allWorkouts.length === 0) {
    throw new NotFoundError(`No workouts found`);
  }
  res.status(StatusCodes.OK).json({ workouts });
};

const getCurrentWorkout = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findById(userId);
  const activeMeso = await user.mesocycles.find(
    (meso) => meso.status == 'Active'
  );
  const workout = await activeMeso.sessions.find(
    (session) => session.status == 'Planned'
  );

  if (!activeMeso) {
    throw new NotFoundError(`You do not have an active mesocycle`);
  }

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
