const { BadRequestError } = require('../errors');

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    //throw new BadRequestError('Test User is read only.');
  }
  next();
};

module.exports = testUser;
