const { Router } = require("express");

const productController = require("../controllers/product");
const productValidation = require("../middleware/validation/product");
const validatorErrorCatcher = require("../middleware/error-handling/validator-error-catcher");

const router = Router();

router.get(
  "/",
  productValidation.get(),
  validatorErrorCatcher,
  productController.get
);

router.post(
  "/",
  productValidation.create(),
  validatorErrorCatcher,
  productController.create
);

router.put(
  "/:productId",
  productValidation.update(),
  validatorErrorCatcher,
  productController.update
);

router.delete(
  "/:productId",
  productValidation.delete(),
  validatorErrorCatcher,
  productController.delete
);

module.exports = router;
