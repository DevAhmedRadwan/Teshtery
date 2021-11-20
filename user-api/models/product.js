const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subcategory: {
    type: String,
  },
  tags: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "tag",
  },
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("product", productSchema);
