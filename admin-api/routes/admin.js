const { Router } = require("express");

const adminController = require("../controllers/admin");
const adminValidation = require("../middleware/validation/admin");
const validatorErrorCatcher = require("../middleware/error-handling/validator-error-catcher");

const router = Router();

router.post(
  "/",
  adminValidation.create(),
  validatorErrorCatcher,
  adminController.create
);

module.exports = router;
