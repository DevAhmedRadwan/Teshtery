const { Router } = require("express");
const { requireAuth } = require("../middleware/auth");
/****************************** Required routes  ******************************/
const auth = require("./auth");
const admin = require("./admin");
const category = require("./category");
const product = require("./product");
const tag = require("./tag");
const user = require("./user");

/******************************* initializing *********************************/
const router = Router();

/************************************ Routes **********************************/
router.use("/auth",auth);
router.use("/admin",requireAuth,admin);
router.use("/category",requireAuth,category);
router.use("/product",requireAuth,product);
router.use("/tag",requireAuth,tag);
router.use("/user",requireAuth,user);

/************************************ Exports **********************************/
module.exports = router;