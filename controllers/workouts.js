const { User, Session, Exercise, Set } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const { userObject, login } = require('./user');

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

  const workout = meso.sessions.find(
    (session) => session._id == workoutId
  )._doc;

  if (!workout) {
    throw new NotFoundError(`No workout with id ${workoutId}`);
  }
  res.status(StatusCodes.OK).json({ workout: { ...workout, mesoId } });
};

const updateWorkout = async (req, res) => {
  const {
    user: { userId },
    params: { mesoId, workoutId },
    body: {
      workout: {
        musclesTrained,
        notes,
        microcycle,
        sessionName,
        sessionNumber,
      },
      isCurrentWorkout,
    },
  } = req;

  const exercises = req.body.workout.exercises.map((exercise) => {
    const { notes, _id, exerciseName, repRange, sets, muscleGroup } = exercise;
    return {
      notes,
      _id,
      exerciseName,
      muscleGroup,
      repRange,
      sets,
    };
  });

  const user = await User.findById(userId);

  const meso = user.mesocycles.find((mesocycle) => mesocycle._id == mesoId);

  const workout = meso.sessions.find((session) => session._id == workoutId);

  if (!workout) {
    throw new NotFoundError(`No workout with id ${workoutId}`);
  }

  workout.musclesTrained = musclesTrained;
  workout.notes = notes;
  workout.exercises = exercises;

  let msg = 'Saved changes!';

  if (workout.status == 'Planned' && isCurrentWorkout) {
    workout.status = 'Completed';
    workout.dateCompleted = new Date();

    let setsCount = 0;
    let setsToFailure = 0;

    exercises.map((exercise) => {
      exercise.sets.map((set) => {
        setsCount++;
        if (set.repsInReserve == 0) {
          setsToFailure++;
        }
      });
    });

    if (meso.microcycles < microcycle + 1) {
      meso.microcycles = microcycle + 1;
    }

    const newSession = new Session({
      microcycle: microcycle + 1,
      sessionName,
      sessionNumber,
      musclesTrained,
      exercises: exercises.map((exercise) => {
        const { notes, exerciseName, repRange, sets, muscleGroup } = exercise;

        const repRangeLower = Number(repRange.match(/^\d+/)[0]);
        const repRangeUpper = Number(repRange.match(/\d+$/)[0]);

        let performanceScore = 0;

        let lessThanMinRepsSets = 0;

        let changeWeight;

        sets.map((set) => {
          if (set.repetitions < repRangeLower) {
            lessThanMinRepsSets++;
          }
        });

        sets.map((set) => {
          if (set.repetitions >= repRangeUpper && lessThanMinRepsSets == 0) {
            changeWeight = 'Increase';
          } else if (set.repetitions < 5) {
            changeWeight = 'Decrease';
          } /* else if (sets[i].repsInReserve <= sets[i].targetRIR - 2) {
              changeWeight = 'Decrease';
            } */
        });
        if (lessThanMinRepsSets == sets.length) {
          changeWeight = 'Decrease';
        }

        let hardSets = 0;

        sets.map((set, index) => {
          const { repetitions, targetReps, repsInReserve, targetRIR } = set;

          // Depending on repetitions achieved and reps in reserve, a performance score is allocated
          // At the moment they are very strict, a single set bring the score down

          const calculatedReps =
            repetitions - targetReps + (repsInReserve - targetRIR);

          // very tricky to get right

          if (microcycle != 1) {
            if (calculatedReps >= 2 && performanceScore < 3 && index != 0) {
              performanceScore = 1;
            } else if (calculatedReps >= 0 && performanceScore != 4) {
              performanceScore = 2;
            } else if (
              repetitions == targetReps &&
              repsInReserve >= targetRIR - 1 &&
              index != 0 &&
              performanceScore < 3
            ) {
              hardSets++;
              if (hardSets < Math.ceil(sets.length / hardSets)) {
                performanceScore = 2;
              } else {
                performanceScore = 3;
              }
            } else if (repetitions < targetReps) {
              performanceScore = 4;
            } else if (performanceScore != 4) {
              performanceScore = 3;
            }
          } else {
            if (calculatedReps >= 2 && performanceScore != 4) {
              performanceScore = 1;
            } else if (calculatedReps >= -1 && performanceScore != 4) {
              performanceScore = 2;
            } else if (calculatedReps >= 0) {
              performanceScore = 2;
            } else if (repetitions < 5) {
              performanceScore = 4;
              changeWeight = 'Decrease';
            } else if (performanceScore != 4) {
              performanceScore = 3;
            }
          }

          // first idea
          // if (
          //   ((repetitions > targetReps + 1 && repsInReserve >= targetRIR) ||
          //     (repetitions >= targetReps && repsInReserve > targetRIR + 1)) &&
          //   performanceScore != 4
          // ) {
          //   performanceScore = 1;
          // } else if (
          //   ((repetitions == targetReps + 1 &&
          //     repsInReserve >= targetRIR - 1) ||
          //     (repetitions == targetReps && repsInReserve == targetRIR + 1) ||
          //     (repetitions == targetReps && repsInReserve == targetRIR)) &&
          //   performanceScore != 4
          // ) {
          //   performanceScore = 2;
          // } else if (
          //   repetitions == targetReps &&
          //   repsInReserve < targetRIR &&
          //   performanceScore != 4
          // ) {
          //   performanceScore = 3;
          // } else if (repetitions < targetReps) {
          //   // too strict for first week
          //   performanceScore = 4;
          // } else if (repsInReserve < targetRIR - 1 && performanceScore != 4) {
          //   performanceScore = 3;
          // }
        });
        const newExercise = new Exercise({
          notes,
          exerciseName,
          muscleGroup,
          repRange,
          changeWeight,
          performanceScore,
          sets: sets.map((set) => {
            const { weight, repetitions, repsInReserve, targetRIR } = set;

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

    msg = 'Completed workout!';
  }

  await user.save();

  res.status(StatusCodes.OK).json(
    { ...userObject(user), msg } /* {
    user: userObject(user),
    workout: {
      ...user.mesocycles
        ?.find((meso) => meso.status == 'Active')
        ?.sessions?.find((session) => session.status == 'Planned')?._doc,
      mesoId: user.mesocycles?.find((meso) => meso.status == 'Active')?._id,
    } ,
  } */
  );
};

const deleteWorkout = async (req, res) => {
  const {
    user: { userId },
    params: { mesoId, workoutId },
  } = req;

  const user = await User.findById(userId);

  const meso = user.mesocycles.find((mesocycle) => mesocycle._id == mesoId);

  const session = meso.sessions.find((session) => session._id == workoutId);

  meso.sessions.length == 1 ? meso.remove() : session.remove();

  meso.microcycles = session.microcycle - 1;
  meso.sessions.map((item) => {
    if (item.microcycle > meso.microcycles) {
      meso.microcycles = item.microcycle;
    }
  });

  await user.save();

  res.status(StatusCodes.OK).json(
    userObject(user) /* {
    user: userObject(user),
    workout: {
      ...user.mesocycles
        ?.find((meso) => meso.status == 'Active')
        ?.sessions?.find((session) => session.status == 'Planned')?._doc,
      mesoId: user.mesocycles?.find((meso) => meso.status == 'Active')?._id,
    } ,
  } */
  );
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
};
