const { User, Session, Exercise, Set } = require('../models');
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
    body: {
      musclesTrained,
      notes,
      microcycle,
      sessionName,
      sessionNumber,
      exercises,
    },
  } = req;

  const user = await User.findById(userId);

  const meso = user.mesocycles.find((mesocycle) => mesocycle._id == mesoId);

  const workout = meso.sessions.find((session) => session._id == workoutId);

  if (!workout) {
    throw new NotFoundError(`No workout with id ${workoutId}`);
  }

  workout.exercises = exercises;

  if (workout.status == 'Planned') {
    // workout.status = 'Completed';

    let setsCount = 0;
    let setsToFailure = 0;

    for (let i = 0; i < exercises.length; i++) {
      for (let j = 0; j < exercises[i].sets.length; j++) {
        setsCount++;
        if (exercises[i].sets[j].repsInReserve == 0) {
          setsToFailure++;
        }
      }
    }
    console.log(setsCount, setsToFailure);

    const newSession = new Session({
      microcycle: microcycle + 1,
      sessionName,
      sessionNumber,
      musclesTrained,
      exercises: exercises.map((exercise) => {
        const { notes, exerciseName, repRange, sets } = exercise;

        const repRangeLower = Number(repRange.match(/^\d+/)[0]);
        const repRangeUpper = Number(repRange.match(/\d+$/)[0]);

        let lessThanMinRepsSets = 0;
        for (let i = 0; i < sets.length; i++) {
          if (sets[i].repetitions < repRangeLower) {
            lessThanMinRepsSets++;
          }
        }

        let changeWeight;
        for (let i = 0; i < sets.length; i++) {
          if (
            sets[i].repetitions >= repRangeUpper &&
            lessThanMinRepsSets == 0
          ) {
            changeWeight = 'Increase';
          } else if (sets[i].repetitions < 5) {
            changeWeight = 'Decrease';
          } /*  else if (sets[i].repsInReserve <= sets[i].targetRIR - 2) {
          changeWeight = 'Decrease';
        } */
        }
        // maybe change this
        if (lessThanMinRepsSets == sets.length) {
          changeWeight = 'Decrease';
        }

        const newExercise = new Exercise({
          notes,
          exerciseName,
          repRange,
          changeWeight,
          sets: sets.map((set) => {
            const { weight, repetitions, repsInReserve, targetRIR } = set;

            // add more sets based on rir
            const newSet = new Set({
              weight,
              targetReps:
                changeWeight == 'Increase'
                  ? repetitions
                  : changeWeight == 'Decrease' && repetitions >= repRangeLower
                  ? repetitions
                  : changeWeight == 'Decrease'
                  ? repRangeLower
                  : repetitions <= repRangeUpper
                  ? Number(repetitions) + 1
                  : repetitions,
              targetRIR: repsInReserve != 0 ? targetRIR - 1 : 0, // come back to this, not happy
            });
            return newSet;
          }),
        });
        return newExercise;
      }),
      notes,
    });

    meso.sessions.push(newSession);
  }

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
