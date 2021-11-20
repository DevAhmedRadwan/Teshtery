const { query } = require("express-validator");
const mongoose = require("mongoose");

module.exports.get = () => {
  return [
    query("_id")
      .if(query("_id").exists())
      .isString()
      .custom((value) => {
        if (!mongoose.isValidObjectId(value))
          return Promise.reject("Invalid _id");
        return Promise.resolve();
      }),
  ];
};
