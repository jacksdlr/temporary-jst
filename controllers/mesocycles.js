const ObjectId = require('mongoose').Types.ObjectId;
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const { User, Mesocycle, Session, Exercise, Set } = require('../models');
const { userObject } = require('./user');

const getAllMesocycles = async (req, res) => {
  const { mesoName, status, goal, microcycles, sort, page } = req.query;

  let user = await User.aggregate([
    { $match: { _id: ObjectId(req.user.userId) } },
    {
      $unwind: '$mesocycles',
    },
    mesoName != undefined
      ? {
          $match: {
            'mesocycles.mesoName': { $regex: mesoName, $options: 'i' },
          },
        }
      : { $match: {} },
    microcycles != undefined
      ? { $match: { 'mesocycles.microcycles': Number(microcycles) } }
      : { $match: {} },
    status != 'All'
      ? { $match: { 'mesocycles.status': status } }
      : { $match: {} },
    goal != 'All' ? { $match: { 'mesocycles.goal': goal } } : { $match: {} },
  ]);

  let result = await User.aggregate([
    { $match: { _id: ObjectId(req.user.userId) } },
    {
      $unwind: '$mesocycles',
    },
    mesoName != undefined
      ? {
          $match: {
            'mesocycles.mesoName': { $regex: mesoName, $options: 'i' },
          },
        }
      : { $match: {} },
    microcycles != undefined
      ? { $match: { 'mesocycles.microcycles': Number(microcycles) } }
      : { $match: {} },
    status != 'All'
      ? { $match: { 'mesocycles.status': status } }
      : { $match: {} },
    goal != 'All' ? { $match: { 'mesocycles.goal': goal } } : { $match: {} },
    sort == 'Last Updated'
      ? { $sort: { 'mesocycles.updatedAt': -1 } }
      : sort == 'Oldest'
      ? { $sort: { 'mesocycles.updatedAt': 1 } }
      : { $match: {} },
    page != undefined ? { $skip: (Number(page) - 1) * 8 } : { $skip: 0 },
    { $limit: 8 },
  ]);

  if (!user) {
    throw new NotFoundError(`No mesocycles found`);
  }

  const totalMesocycles = user.length;
  const numberOfPages = Math.ceil(totalMesocycles / 8);

  res.status(StatusCodes.OK).json({
    mesocycles: result.map((item) => item.mesocycles),
    totalMesocycles,
    numberOfPages,
  });
};

const createMeso = async (req, res) => {
  const {
    mesoName,
    goal,
    startDate,
    startWeight,
    setActive,
    sessions,
    sessionsCount,
    mesoNotes,
  } = req.body;

  let notes = [];
  if (mesoNotes) {
    notes.push(mesoNotes);
  }

  const user = await User.findById(req.user.userId);

  if (user.mesocycles.find((meso) => meso.mesoName == mesoName)) {
    throw new BadRequestError('Mesocycle name already exists');
  }

  if (setActive == true) {
    const activeMeso = user.mesocycles.find((meso) => meso.status == 'Active');
    if (activeMeso && activeMeso.sessions[0].status == 'Planned') {
      activeMeso.status = 'Planned';
    } else if (activeMeso && activeMeso.sessions[0].status != 'Planned') {
      activeMeso.status = 'Incomplete';
    }
  }

  const newMesocycle = new Mesocycle({
    mesoName,
    microcycles: 1,
    goal,
    startDate,
    startWeight,
    sessionsCount,
    notes,
    status: !setActive ? 'Planned' : 'Active',
    sessions: sessions.map((session, index) => {
      const { sessionName, exercises, sessionNotes } = session;

      let musclesTrained = [];
      exercises.map((exercise) => {
        if (!musclesTrained.find((muscle) => muscle == exercise.muscleGroup)) {
          musclesTrained.push(exercise.muscleGroup);
        }
      });

      notes = [];
      if (sessionNotes) {
        notes.push(sessionNotes);
      }

      const newSession = new Session({
        microcycle: 1,
        sessionName,
        sessionNumber: index + 1,
        musclesTrained,
        notes,
        exercises: exercises.map((exercise) => {
          const { exerciseName, repRange, exerciseNotes, muscleGroup } =
            exercise;

          let setsArray = [];
          for (; exercise.sets; ) {
            setsArray.push(
              new Set({
                targetReps: repRange.match(/^\d+/)[0],
                targetRIR: /* microcycles < 8 ? 3 : microcycles < 4 ? 2 : 1, */ 3,
              })
            );
            exercise.sets--;
          }

          notes = [];
          if (exerciseNotes) {
            notes.push(exerciseNotes);
          }

          const newExercise = new Exercise({
            exerciseName,
            repRange,
            muscleGroup,
            sets: setsArray /* [
              new Set({
                targetReps: repRange.match(/^\d+/)[0],
                targetRIR: /* microcycles < 8 ? 3 : microcycles < 4 ? 2 : 1,  3,
              }),
              new Set({
                targetReps: repRange.match(/^\d+/)[0],
                targetRIR: /* microcycles < 8 ? 3 : microcycles < 4 ? 2 : 1,  3,
              }),
            ], */,
            notes,
          });
          return newExercise;
        }),
      });
      return newSession;
    }),
  });

  user.mesocycles.push(newMesocycle);
  await user.save();

  // const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: userObject(user),
  });
};

// FOR LATER UPDATE: IF THE CURRENT STATUS IS 'PLANNED' LOAD THE SESSIONS ONTO THE PAGE AND SAVE TO DATABASE (USERS SHOULD BE ALLOWED TO EDIT THE SESSIONS OF A PLANNED MESO FROM THE CREATE MESO PAGE)
const updateMeso = async (req, res) => {
  const {
    user: { userId },
    params: { mesoId },
    body: {
      mesoName,
      setActive,
      mesoNotes,
      goal,
      startDate,
      startWeight,
      endWeight,
    },
  } = req;

  let notes = [];
  if (mesoNotes) {
    notes.push(mesoNotes);
  }

  const user = await User.findById(userId);

  const meso = user.mesocycles.find((mesocycle) => mesocycle._id == mesoId);

  if (!meso) {
    throw new BadRequestError('Mesocycle does not exist');
  }

  meso.mesoName = mesoName;
  if (meso.status != 'Active' && setActive == true) {
    const activeMeso = user.mesocycles.find((meso) => meso.status == 'Active');
    if (activeMeso) {
      activeMeso.sessions[0].status == 'Planned'
        ? (activeMeso.status = 'Planned')
        : (activeMeso.status = 'Incomplete');
    }
    meso.status = 'Active';
  } else if (meso.status == 'Active' && setActive == false) {
    meso.sessions[0].status == 'Planned'
      ? (meso.status = 'Planned')
      : (meso.status = 'Incomplete');
  }

  meso.notes = notes || '';
  meso.goal = goal || '';
  meso.startDate = startDate || '';
  meso.startWeight = startWeight || '';
  meso.endWeight = endWeight || '';

  await user.save();

  // const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: userObject(user),
  });
};

const deleteMeso = async (req, res) => {
  const {
    user: { userId },
    params: { mesoId },
  } = req;

  const user = await User.findById(userId);

  const meso = await user.mesocycles.find(
    (mesocycle) => mesocycle._id == mesoId
  );

  if (!meso) {
    throw new BadRequestError('Mesocycle does not exist');
  }

  meso.remove();

  await user.save();

  // const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: userObject(user),
  });
};

module.exports = {
  getAllMesocycles,
  createMeso,
  updateMeso,
  deleteMeso,
};
