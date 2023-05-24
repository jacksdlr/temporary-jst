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

        status: 'planned',
      });
      return newSession;
    }),
    currentSession: '',
    notes: [],
  });

  const user = await User.findById(req.user.userId);

  user.mesocycles.push(newMesocycle);
  user.save();

  res.status(StatusCodes.CREATED).json({ user });
};

module.exports = {
  createMeso,
};
