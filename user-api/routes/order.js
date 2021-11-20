const { Router } = require("express");

const orderController = require("../controllers/order");
const orderValidation = require("../middleware/validation/order");
const validatorErrorCatcher = require("../middleware/error-handling/validator-error-catcher");

const router = Router();

router.get(
  "/",
  orderValidation.get(),
  validatorErrorCatcher,
  orderController.get
);

router.post(
  "/",
  orderValidation.create(),
  validatorErrorCatcher,
  orderController.create
);

router.put(
  "/:orderId",
  orderValidation.update(),
  validatorErrorCatcher,
  orderController.update
);

module.exports = router;
