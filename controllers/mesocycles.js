// const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
// const { Mesocycle } = require('../models/Mesocycle');
// const { Session } = require('../models/Session');
// const { Exercise } = require('../models/Exercise');
// const { Set } = require('../models/Set');
const { User, Mesocycle, Session, Exercise, Set } = require('../models');

// DOES THIS NEED AUTHENTICATING???
const createMeso = async (req, res) => {
  const { mesoName, microcycles, goal, startDate, startWeight, sessions } =
    req.body;

  const user = await User.findById(req.user.userId);

  if (user.mesocycles.find((meso) => meso.mesoName == mesoName)) {
    throw new BadRequestError('Mesocycle name already exists');
  }

  const newMesocycle = new Mesocycle({
    mesoName,
    microcycles,
    goal,
    startDate,
    startWeight,
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

module.exports = {
  createMeso,
};
