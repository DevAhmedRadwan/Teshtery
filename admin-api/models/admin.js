const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const { buildError } = require("../common/utilities");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Is missing!"],
    validate: [isEmail, "Please enter a valid email"],
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, "Is missing!"],
    minLength: [3, "Minimum username length is 3 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Is missing!"],
    minLength: [6, "Minimum password length is 6 characters"],
  }
});

adminSchema.plugin(uniqueValidator);

// db schema hook to encrypt passwords before saving them 
adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user with email
adminSchema.statics.loginWithMail = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw buildError(403, "Incorrect password!", null);
  }
  throw buildError(404, "Email not found!", null);
};

// static method to login user with username
adminSchema.statics.loginWithUsername = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw buildError(403, "Incorrect password!", null);
  }
  throw buildError(404, "Username not found!", null);
};

module.exports = mongoose.model("admin", adminSchema);
