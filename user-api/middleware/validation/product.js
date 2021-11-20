const { query, param, body } = require("express-validator");
const mongoose = require("mongoose");

module.exports.get = () => {
  return [
    query("pop").if(query("pop").exists()).isBoolean(),
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
    query("ids")
      .if(query("ids").exists())
      .custom((ids) => {
        if (typeof ids === "object") {
          for (id of ids) {
            if (!mongoose.isValidObjectId(id))
              return Promise.reject("Invalid ids");
          }
        } else if (typeof ids === "string") {
          if (!mongoose.isValidObjectId(ids))
            return Promise.reject("Invalid ids");
        } else {
          return Promise.reject("Invalid ids");
        }
        return Promise.resolve();
      }),
    query("name").if(query("name").exists()).isString(),
    query("price").if(query("price").exists()).isNumeric(),
    query("tags")
      .if(query("tags").exists())
      .isArray()
      .custom((tags) => {
        for (tag of tags) {
          if (!mongoose.isValidObjectId(tag))
            return Promise.reject("Invalid tags");
        }
        return Promise.resolve();
      }),
  ];
};
