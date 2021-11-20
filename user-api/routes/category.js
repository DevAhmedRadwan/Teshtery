const { Router } = require("express");

const categoryController = require("../controllers/category");
const categoryValidation = require("../middleware/validation/category");
const validatorErrorCatcher = require("../middleware/error-handling/validator-error-catcher");

const router = Router();

router.get(
  "/",
  categoryValidation.get(),
  validatorErrorCatcher,
  categoryController.get
);

module.exports = router;
