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
    body("details")
      .isString()
      .custom((value) => {
        if (value.length < 1) return Promise.reject("Invalid details");
        return Promise.resolve();
      }),
    body("subcategories")
      .if(body("subcategories").exists())
      .isArray()
      .custom((subcategories) => {
        let subcategoriesfiltered = subcategories.filter(
          (subcategory) => typeof subcategory === "string"
        );
        if (subcategoriesfiltered.length < subcategories.length)
          return Promise.reject("Invalid subcategories");
        let subcategoriesSet = new Set(subcategories);
        if (subcategoriesSet.size < subcategories.length)
          return Promise.reject("There is duplicant subcategories!");
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
    body("details")
      .if(body("details").exists())
      .isString()
      .custom((value) => {
        if (value.length < 1) return Promise.reject("Invalid details");
        return Promise.resolve();
      }),
    body("subcategories")
      .if(body("subcategories").exists())
      .isArray()
      .custom((subcategories) => {
        let subcategoriesfiltered = subcategories.filter(
          (subcategory) => typeof subcategory === "string"
        );
        if (subcategoriesfiltered.length < subcategories.length)
          return Promise.reject("Invalid subcategories");
        let subcategoriesSet = new Set(subcategories);
        if (subcategoriesSet.size < subcategories.length)
          return Promise.reject("There is duplicant subcategories!");
        return Promise.resolve();
      }),
    param("categoryId")
      .if(param("categoryId").exists())
      .isString()
      .custom((value) => {
        if (!mongoose.isValidObjectId(value))
          return Promise.reject("Invalid categoryId");
        return Promise.resolve();
      }),
  ];
};

module.exports.delete = () => {
  return [
    param("categoryId")
      .if(param("categoryId").exists())
      .isString()
      .custom((value) => {
        if (!mongoose.isValidObjectId(value))
          return Promise.reject("Invalid categoryId");
        return Promise.resolve();
      }),
  ];
};
