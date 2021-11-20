const { body } = require('express-validator');

module.exports.signin = () => {
  return [
    body('id').isLength({ min: 3 }),
    body('password').isLength({ min: 6 }),
  ];
}