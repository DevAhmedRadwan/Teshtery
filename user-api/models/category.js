const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  details: {
    type: String,
  },
  subcategories: {
    type: [String],
  },
});

module.exports = mongoose.model("category", categorySchema);
