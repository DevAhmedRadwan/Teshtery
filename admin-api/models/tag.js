const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    minLength: [1, "Minimum name length is 1 characters"],
  },
});

tagSchema.plugin(uniqueValidator);
tagSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("tag", tagSchema);
