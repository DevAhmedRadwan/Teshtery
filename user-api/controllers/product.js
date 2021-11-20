const Product = require("../models/product");
const Category = require("../models/category");
const Tag = require("../models/tag");

module.exports.get = async (req, res, next) => {
  try {
    const { page, pagesize, _id, ids, name, price, tags, pop } = req.query;

    let query = {};
    if (_id) query["_id"] = _id;
    if (ids) query["_id"] = {$in: ids};
    if (name) query["name"] = name;
    if (price) query["price"] = price;
    if (tags) query["tags"] = tags;

    let populate = [];
    if (pop) {
      populate.push({
        path: "category",
        modal: Category,
        select: ["_id", "name"],
      });
      populate.push({
        path: "tags",
        modal: Tag,
        select: ["_id", "name"],
      });
    }

    const products = await Product.paginate(query, {
      page: page ? page : 1,
      limit: pagesize ? pagesize : 20,
      populate: populate,
    });

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
