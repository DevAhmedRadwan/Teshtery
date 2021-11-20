const { Router } = require("express");

const tagController = require("../controllers/tag");
const tagValidation = require("../middleware/validation/tag");
const validatorErrorCatcher = require("../middleware/error-handling/validator-error-catcher");

const router = Router();

router.get(
  "/",
  tagValidation.get(),
  validatorErrorCatcher,
  tagController.get
);

router.post(
  "/",
  tagValidation.create(),
  validatorErrorCatcher,
  tagController.create
);

router.put(
  "/:tagId",
  tagValidation.update(),
  validatorErrorCatcher,
  tagController.update
);

router.delete(
  "/:tagId",
  tagValidation.delete(),
  validatorErrorCatcher,
  tagController.delete
);

module.exports = router;
