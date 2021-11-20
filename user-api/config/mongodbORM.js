const mongoose = require("mongoose");

const { db_uri } = require("./config");

module.exports = mongoose.connect(
  db_uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);