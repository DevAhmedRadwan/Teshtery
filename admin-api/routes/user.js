const { Router } = require("express");

const userController = require("../controllers/user");
const userValidation = require("../middleware/validation/user");
const validatorErrorCatcher = require("../middleware/error-handling/validator-error-catcher");

const router = Router();

router.get(
  "/",
  userValidation.get(),
  validatorErrorCatcher,
  userController.get
);

router.put(
  "/disable/:userId",
  userValidation.disable(),
  validatorErrorCatcher,
  userController.disable
);

router.put(
  "/enable/:userId",
  userValidation.enable(),
  validatorErrorCatcher,
  userController.enable
);

module.exports = router;
