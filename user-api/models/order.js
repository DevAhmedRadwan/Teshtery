const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Product = require("./product");

const productsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: [true, "Is missing!"],
  },
  quantity: {
    type: Number,
    required: [true, "Is missing!"],
  },
  total: {
    type: Number,
  },
});

const orderSchema = new mongoose.Schema({
  products: {
    type: [productsSchema],
    required: [true, "Is missing!"],
  },
  total: {
    type: Number,
  },
});

orderSchema.plugin(mongoosePaginate);

async function calculateTotals(next) {
  let sum = 0;

  let ids = [];
  this.products.forEach((product) => {
    ids.push(product.productId);
  });

  let products = await Product.find({ _id: { $in: ids } });

  products.forEach((product) => {
    let productSum = 0;
    this.products.forEach((curProduct, index) => {
      if (
        mongoose.Types.ObjectId(curProduct.productId).equals(
          mongoose.Types.ObjectId(product._id)
        )) {
        productSum = product.price * curProduct.quantity;
        this.products[index].total = productSum;
      }
    });
    sum += productSum;
  });

  this.total = sum;
  next();
}

// db schema hook to encrypt passwords before saving them
orderSchema.pre("save", calculateTotals);

// db schema hook to encrypt passwords before saving them
orderSchema.pre("update", calculateTotals);

module.exports = mongoose.model("order", orderSchema);
