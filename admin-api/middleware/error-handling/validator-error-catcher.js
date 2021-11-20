const { validationResult } = require("express-validator");
const { buildError } = require("../../common/utilities");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(buildError(422, "Validation failed.", errors.array()));
  }
  next();
};