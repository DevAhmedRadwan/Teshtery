const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("user", userSchema);
