const Category = require("../models/category");

module.exports.get = async (req, res, next) => {
  try {
    const { page, pagesize, _id, name } = req.query;

    let query = {};
    if (_id) query["_id"] = _id;
    if (name) query["name"] = name;

    let categories = null;
    if (page > 0)
      categories = await Category.paginate(query, {
        page: page ? page : 1,
        limit: pagesize ? pagesize : 20,
      });
    else categories = await Category.find(query);

    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const { name, details, subcategories = [] } = req.body;

    const category = await Category.create({ name, details, subcategories });

    res.status(201).json({
      categoryId: category._id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    const { name, details, subcategories } = req.body;

    let updateQuery = {};
    if (name) updateQuery["name"] = name;
    if (details) updateQuery["details"] = details;
    if (subcategories) updateQuery["subcategories"] = subcategories;

    const category = await Category.updateOne(
      { _id: categoryId },
      updateQuery,
      { new: true }
    );

    res.status(200).json({
      categoryId: category._id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await Category.deleteOne({ _id: categoryId });

    res.status(200).json({
      categoryId: category._id,
    });
  } catch (err) {
    next(err);
  }
};
