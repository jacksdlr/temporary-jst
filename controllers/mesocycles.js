const ObjectId = require('mongoose').Types.ObjectId;
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const { User, Mesocycle, Session, Exercise, Set } = require('../models');

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

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      mesocycles: user.mesocycles,
      currentMeso: user.currentMeso,
      exercises: user.customExercises,
      data: {
        height: user.height,
        weight: user.weight,
        age: user.age,
        sex: user.sex,
        activityLevel: user.activityLevel,
      },
      token,
    },
  });
};

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
    mesoName || user.mesocycles[mesoIndex].mesoName;
  if ((user.mesocycles[mesoIndex].status = 'Planned')) {
    if (setActive == true) {
      const activeMesoIndex = user.mesocycles.findIndex(
        (meso) => meso.status == 'Active'
      );
      if (activeMesoIndex != -1) {
        user.mesocycles[activeMesoIndex].status = 'Completed';
      }
      user.mesocycles[mesoIndex].status = 'Active';
    }
  } else if ((user.mesocycles[mesoIndex].status = 'Planned')) {
    if (setActive == false) {
      user.mesocycles[mesoIndex].status = 'Planned';
      // !!!!!!!!
      // check if sessions are complete to mark as complete
      // !!!!!!!!
    }
  }
  user.mesocycles[mesoIndex].microcycles =
    microcycles || user.mesocycles[mesoIndex].microcycles;
  user.mesocycles[mesoIndex].notes = notes || user.mesocycles[mesoIndex].notes;
  user.mesocycles[mesoIndex].goal = goal || user.mesocycles[mesoIndex].goal;
  user.mesocycles[mesoIndex].startDate =
    startDate || user.mesocycles[mesoIndex].startDate;
  user.mesocycles[mesoIndex].startWeight =
    startWeight || user.mesocycles[mesoIndex].startWeight;
  user.mesocycles[mesoIndex].endWeight =
    endWeight || user.mesocycles[mesoIndex].endWeight;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      mesocycles: user.mesocycles,
      currentMeso: user.currentMeso,
      exercises: user.customExercises,
      data: {
        height: user.height,
        weight: user.weight,
        age: user.age,
        sex: user.sex,
        activityLevel: user.activityLevel,
      },
      token,
    },
  });
};

module.exports = {
  getAllMesocycles,
  createMeso,
  updateMeso,
};
