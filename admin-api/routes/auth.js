const { Router } = require("express");

const authController = require("../controllers/auth");
const authValidation = require("../middleware/validation/auth");
const validatorErrorCatcher = require("../middleware/error-handling/validator-error-catcher");

const router = Router();

router.post(
  "/signin",
  authValidation.signin(),
  validatorErrorCatcher,
  authController.signin
);

router.post("/signout", authController.signout);

module.exports = router;
