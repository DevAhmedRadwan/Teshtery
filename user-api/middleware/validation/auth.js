const { body } = require('express-validator');

module.exports.signin = () => {
  return [
    body('id').isLength({ min: 3 }),
    body('password').isLength({ min: 6 }),
  ];
}

module.exports.signup = () => {
  return [
    body('email').isEmail().isLength({ min: 3 }),
    body('username').isLength({ min: 3 }),
    body('password').isLength({ min: 6 }),
  ];
}
