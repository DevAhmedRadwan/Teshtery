const { query, param, body } = require("express-validator");
const mongoose = require("mongoose");

module.exports.get = () => {
  return [
    query("page").if(query("page").exists()).isInt({ min: 0 }),
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
    query("name").if(query("name").exists()).isString(),
  ];
};

module.exports.create = () => {
  return [
    body("name")
      .isString()
      .custom((value) => {
        if (value.length < 1) return Promise.reject("Invalid name");
        return Promise.resolve();
      }),
  ];
};

module.exports.update = () => {
  return [
    body("name")
      .isString()
      .custom((value) => {
        if (value.length < 1) return Promise.reject("Invalid name");
        return Promise.resolve();
      }),
    param("tagId")
      .if(param("tagId").exists())
      .isString()
      .custom((value) => {
        if (!mongoose.isValidObjectId(value))
          return Promise.reject("Invalid tagId");
        return Promise.resolve();
      }),
  ];
};

module.exports.delete = () => {
  return [
    param("tagId")
      .if(param("tagId").exists())
      .isString()
      .custom((value) => {
        if (!mongoose.isValidObjectId(value))
          return Promise.reject("Invalid tagId");
        return Promise.resolve();
      }),
  ];
};
