const { body, } = require('express-validator');
const { isEmail } = require('validator');

module.exports.create = () => {
  return [
    body('username').isLength({ min: 3 }),
    body('email')
    .isLength({ min: 3 })
    .custom((value, { req, location, path }) => {
      if (!isEmail(value))
        return Promise.reject("Invalid email");
      return Promise.resolve();
    }),
    body('password').isLength({ min: 6 }),
  ];
}
