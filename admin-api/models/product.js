const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Category = require("./category.js");
const Tag = require("./tag.js");
const { buildError } = require("../common/utilities");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [1, "Minimum name length is 1 characters"],
    required: [true, "Is missing!"],
  },
  description: {
    type: String,
    minLength: [1, "Minimum description length is 1 characters"],
    required: [true, "Is missing!"],
  },
  price: {
    type: Number,
    required: [true, "Is missing!"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: [true, "Is missing!"],
  },
  subcategory: {
    type: String,
    default: "",
  },
  tags: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "tag",
    default: [],
  },
});

productSchema.plugin(mongoosePaginate);

productSchema.pre("save", async function (next) {
  if (this.price < 0) throw buildError(400, "Price can't be nigative!", null);
  const category = await Category.findOne({ _id: this.category });
  if (category && this.subcategory) {
    const subcategory = category.subcategories.filter(
      (subcategory) => subcategory === this.subcategory
    );
    if (subcategory.length !== 1)
      throw buildError(400, "There is no subcategory with this name!", null);
  } else if (!category) {
    throw buildError(400, "There is no category with this id!", null);
  }
  let tagQuery = [];
  for (tag of this.tags) {
    tagQuery.push(mongoose.Types.ObjectId(tag));
  }
  const tags = await Tag.find({ _id: { $in: tagQuery } });
  if (tags.length !== this.tags.length) {
    throw buildError(400, "There is no tag with this id!", null);
  }
  next();
});

productSchema.pre("update", async function (next) {
  if (this.price && this.price < 0)
    throw buildError(403, "Price can't be nigative!", null);
  if (this.category) {
    const category = await Category.findOne({ _id: this.category });
    if (category && this.subcategory) {
      const subcategory = category.subcategories.filter(
        (subcategory) => subcategory === this.subcategory
      );
      if (subcategory.length !== 1)
        throw buildError(400, "There is no subcategory with this name!", null);
    } else if (!category) {
      throw buildError(400, "There is no category with this id!", null);
    }
  }
  if (this.tags) {
    let tagQuery = [];
    for (tag of this.tags) {
      tagQuery.push(mongoose.Types.ObjectId(tag));
    }
    const tags = await Tag.find({ _id: { $in: tagQuery } });
    if (tags.length !== this.tags.length) {
      throw buildError(400, "There is no tag with this id!", null);
    }
  }
  next();
});

module.exports = mongoose.model("product", productSchema);
