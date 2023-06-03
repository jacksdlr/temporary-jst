const ObjectId = require('mongoose').Types.ObjectId;
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const { User, Mesocycle, Session, Exercise, Set } = require('../models');
const { userObject } = require('./user');

const getAllMesocycles = async (req, res) => {
  const user = await User.findById(req.user.userId);

  res.status(StatusCodes.OK).json({ mesocycles: user.mesocycles });
};

// DOES THIS NEED AUTHENTICATING???
const createMeso = async (req, res) => {
  const {
    mesoName,
    microcycles,
    goal,
    startDate,
    startWeight,
    setActive,
    sessions,
  } = req.body;

  const user = await User.findById(req.user.userId);

  if (user.mesocycles.find((meso) => meso.mesoName == mesoName)) {
    throw new BadRequestError('Mesocycle name already exists');
  }

  if (setActive == true) {
    const activeMesoIndex = user.mesocycles.findIndex(
      (meso) => meso.status == 'Active'
    );
    if (activeMesoIndex != -1) {
      user.mesocycles[activeMesoIndex].status = 'Completed';
    }
  }

  const newMesocycle = new Mesocycle({
    mesoName,
    microcycles,
    goal,
    startDate,
    startWeight,
    status: !setActive ? 'Planned' : 'Active',
    sessions: sessions.map((session, index) => {
      const { sessionName, exercises } = session;

      let musclesTrained = [];
      exercises.map((exercise) => {
        if (!musclesTrained.find((muscle) => muscle == exercise.muscleGroup)) {
          musclesTrained.push(exercise.muscleGroup);
        }
      });

      const newSession = new Session({
        microcycle: 1,
        sessionName,
        sessionNumber: index + 1,
        musclesTrained,
        exercises: exercises.map((exercise) => {
          const { exerciseName, repRange, notes } = exercise;

          const newExercise = new Exercise({
            exerciseName,
            sets: [
              new Set({
                targetReps: repRange.match(/^\d+/)[0],
                targetRIR: microcycles < 8 ? 3 : microcycles < 4 ? 2 : 1,
              }),
              new Set({
                targetReps: repRange.match(/^\d+/)[0],
                targetRIR: microcycles < 8 ? 3 : microcycles < 4 ? 2 : 1,
              }),
            ],
            notes,
          });
          return newExercise;
        }),
      });
      return newSession;
    }),
    currentSession: '',
    notes: [],
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
      microcycles,
      notes,
      goal,
      startDate,
      startWeight,
      endWeight,
    },
  } = req;

  const user = await User.findById(userId);

  const mesoIndex = user.mesocycles.findIndex(
    (mesocycle) => mesocycle._id == mesoId
  );

  user.mesocycles[mesoIndex].mesoName =
    mesoName /*  || user.mesocycles[mesoIndex].mesoName */;
  if (user.mesocycles[mesoIndex].status != 'Active' && setActive == true) {
    const activeMesoIndex = user.mesocycles.findIndex(
      (meso) => meso.status == 'Active'
    );
    if (activeMesoIndex != -1) {
      user.mesocycles[activeMesoIndex].sessions[0].status == 'Planned'
        ? (user.mesocycles[activeMesoIndex].status = 'Planned')
        : (user.mesocycles[activeMesoIndex].status = 'Incomplete');
    }
    user.mesocycles[mesoIndex].status = 'Active';
  } else if (
    user.mesocycles[mesoIndex].status == 'Active' &&
    setActive == false
  ) {
    user.mesocycles[mesoIndex].sessions[0].status == 'Planned'
      ? (user.mesocycles[mesoIndex].status = 'Planned')
      : (user.mesocycles[mesoIndex].status = 'Incomplete');
  }
  user.mesocycles[mesoIndex].microcycles =
    microcycles || '' /* user.mesocycles[mesoIndex].microcycles */;
  user.mesocycles[mesoIndex].notes =
    notes || '' /* user.mesocycles[mesoIndex].notes */;
  user.mesocycles[mesoIndex].goal =
    goal || '' /* user.mesocycles[mesoIndex].goal */;
  user.mesocycles[mesoIndex].startDate =
    startDate || '' /* user.mesocycles[mesoIndex].startDate */;
  user.mesocycles[mesoIndex].startWeight =
    startWeight || '' /* user.mesocycles[mesoIndex].startWeight */;
  user.mesocycles[mesoIndex].endWeight =
    endWeight || '' /* user.mesocycles[mesoIndex].endWeight */;

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

  /* const mesoIndex = user.mesocycles.findIndex(
    (mesocycle) => mesocycle._id == mesoId
  ); */
  const meso = await user.mesocycles.find(
    (mesocycle) => mesocycle._id == mesoId
  );

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
