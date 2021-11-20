const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");
const { buildError } = require("../common/utilities");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    minLength: [1, "Minimum name length is 1 characters"],
  },
  details: {
    type: String,
    minLength: [1, "Minimum details length is 1 characters"],
  },
  subcategories: {
    type: [String],
    lowercase: true,
    default: [],
  },
});

categorySchema.plugin(uniqueValidator);
categorySchema.plugin(mongoosePaginate);

categorySchema.pre("save", async function (next) {
  let subcategoriesSet = new Set(this.subcategories);
  if (subcategoriesSet.size < this.subcategories.length)
    throw buildError(403, "There is duplicant subcategories!", null);
  next();
});

categorySchema.pre("update", async function (next) {
  if(this.subcategories){
    let subcategoriesSet = new Set(this.subcategories);
    if (subcategoriesSet.size < this.subcategories.length)
      throw buildError(403, "There is duplicant subcategories!", null);
  }
  next();
});

module.exports = mongoose.model("category", categorySchema);
