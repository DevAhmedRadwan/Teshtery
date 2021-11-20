const { Router } = require("express");
const { requireAuth } = require("../middleware/auth");
/****************************** Required routes  ******************************/
const auth = require("./auth");
const category = require("./category");
const product = require("./product");
const order = require("./order");

/******************************* initializing *********************************/
const router = Router();

/************************************ Routes **********************************/
router.use("/auth", auth);
router.use("/category", category);
router.use("/product", product);
router.use("/order", requireAuth, order);

/************************************ Exports **********************************/
module.exports = router;
