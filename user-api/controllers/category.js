const Category = require("../models/category");

module.exports.get = async (req, res, next) => {
  try {
    const { _id } = req.query;

    let query = {};
    if (_id) query["_id"] = _id;

    const categories = await Category.find(query);

    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
