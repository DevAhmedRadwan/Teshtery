const { query, param } = require("express-validator");
const mongoose = require("mongoose");

module.exports.get = () => {
  return [
    query("page").if(query("page").exists()).isInt({ min: 1 }),
    query("pagesize")
      .if(query("pagesize").exists())
      .isInt({ min: 1, max: 100 }),
    query("_id")
      .if(query("_id").exists())
      .isString()
      .custom((value) => {
        if (!mongoose.isValidObjectId(value))
          return Promise.reject("Invalid _id");
        return Promise.resolve();
      }),
    query("email").if(query("email").exists()).isString(),
    query("username").if(query("username").exists()).isString(),
  ];
};

module.exports.disable = () => {
  return [
    param("userId")
      .if(param("userId").exists())
      .isString()
      .custom((value) => {
        if (!mongoose.isValidObjectId(value))
          return Promise.reject("Invalid userId");
        return Promise.resolve();
      }),
  ];
};

module.exports.enable = () => {
  return [
    param("userId")
      .if(param("userId").exists())
      .isString()
      .custom((value) => {
        if (!mongoose.isValidObjectId(value))
          return Promise.reject("Invalid userId");
        return Promise.resolve();
      }),
  ];
};
