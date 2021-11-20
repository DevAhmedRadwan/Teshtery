const { query, param, body } = require("express-validator");
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
    body("description")
      .isString()
      .custom((value) => {
        if (value.length < 1) return Promise.reject("Invalid description");
        return Promise.resolve();
      }),
    body("price").isNumeric({ min: 0 }),
    body("category")
      .isString()
      .custom((category) => {
        if (!mongoose.isValidObjectId(category))
          return Promise.reject("Invalid category");
        return Promise.resolve();
      }),
    body("subcategory").if(body("subcategory").exists()).isString(),
    body("tags")
      .if(body("tags").exists())
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

module.exports.update = () => {
  return [
    body("name")
      .if(body("name").exists())
      .isString()
      .custom((value) => {
        if (value.length < 1) return Promise.reject("Invalid name");
        return Promise.resolve();
      }),
    body("description")
      .if(body("description").exists())
      .isString()
      .custom((value) => {
        if (value.length < 1) return Promise.reject("Invalid description");
        return Promise.resolve();
      }),
    body("price").if(body("price").exists()).isNumeric({ min: 0 }),
    body("category")
      .if(body("category").exists())
      .isString()
      .custom((category) => {
        if (!mongoose.isValidObjectId(category))
          return Promise.reject("Invalid category");
        return Promise.resolve();
      }),
    body("subcategory").if(body("subcategory").exists()).isString(),
    body("tags")
      .if(body("tags").exists())
      .isArray()
      .custom((tags) => {
        for (tag of tags) {
          if (!mongoose.isValidObjectId(tag))
            return Promise.reject("Invalid tags");
        }
        return Promise.resolve();
      }),
    param("productId")
      .isString()
      .custom((value) => {
        if (!mongoose.isValidObjectId(value))
          return Promise.reject("Invalid productId");
        return Promise.resolve();
      }),
  ];
};

module.exports.delete = () => {
  return [
    param("productId")
      .isString()
      .custom((value) => {
        if (!mongoose.isValidObjectId(value))
          return Promise.reject("Invalid productId");
        return Promise.resolve();
      }),
  ];
};
