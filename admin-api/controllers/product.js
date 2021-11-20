const Product = require("../models/product");

module.exports.get = async (req, res, next) => {
  try {
    const { page, pagesize, _id } = req.query;

    let query = {};
    if (_id) query["_id"] = _id;

    const products = await Product.paginate(query, {
      page: page ? page : 1,
      limit: pagesize ? pagesize : 20,
    });

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const { name, description, price, tags, category, subcategory } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      tags,
      category,
      subcategory,
    });

    res.status(201).json({
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const { name, description, price, tags, category, subcategory } = req.body;

    let updateQuery = {};
    if (name) updateQuery["name"] = name;
    if (description) updateQuery["description"] = description;
    if (price) updateQuery["price"] = price;
    if (tags) updateQuery["tags"] = tags;
    if (category) updateQuery["category"] = category;
    if (subcategory) updateQuery["subcategory"] = subcategory;

    const product = await Product.updateOne({ _id: productId }, updateQuery, {
      new: true,
    });

    res.status(200).json({
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = await Product.deleteOne({ _id: productId });

    res.status(200).json({
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};
