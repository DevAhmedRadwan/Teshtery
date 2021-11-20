const Order = require("../models/order");
const Product = require("../models/product");

module.exports.get = async (req, res, next) => {
  try {
    const { page, pagesize, _id } = req.query;

    let query = {};
    if (_id) query["_id"] = _id;

    const orders = await Order.paginate(query, {
      page: page ? page : 1,
      limit: pagesize ? pagesize : 20,
      populate:[{
        path: "products.productId",
        modal: Product,
      }]
    });

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const { products } = req.body;

    const order = await Order.create({
      products
    });

    res.status(201).json({
      orderId: order._id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;

    const { products } = req.body;

    let updateQuery = {};
    if (products) updateQuery["products"] = products;

    const order = await Order.updateOne({ _id: orderId }, updateQuery, {
      new: true,
    });

    res.status(200).json({
      orderId: order._id,
    });
  } catch (err) {
    next(err);
  }
};
