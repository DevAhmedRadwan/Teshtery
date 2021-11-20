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
    body("products")
      .isArray()
      .custom((products) => {
        for (product of products) {
          if (product.productId === undefined || product.quantity === undefined)
            return Promise.reject("Invalid products");
          if (!mongoose.isValidObjectId(product.productId))
            return Promise.reject("Invalid products");
          if (product.quantity < 1) return Promise.reject("Invalid products");
        }
        return Promise.resolve();
      }),
  ];
};

module.exports.update = () => {
  return [
    body("products")
      .isArray()
      .custom((products) => {
        let ids = new Set();
        for (product of products) {
          if (product.productId === undefined || product.quantity === undefined)
            return Promise.reject("Invalid products");
          if (!mongoose.isValidObjectId(product.productId))
            return Promise.reject("Invalid products");
          if (product.quantity < 1) return Promise.reject("Invalid products");
          ids.add(product.productId);
        }
        if (ids.size < products.length)
          return Promise.reject("Invalid products");
        return Promise.resolve();
      }),
  ];
};
