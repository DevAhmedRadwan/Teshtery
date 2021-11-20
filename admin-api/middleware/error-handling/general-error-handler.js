const { node_env } = require("../../config/config");

module.exports = (error, req, res, next) => {
  let status = error.statusCode || 500;
  let message = error.message;
  let data = error.data;

  // in development log all errors
  if (node_env == "development") {
    console.log("development only : ",error);
  }

  // in testing and production only
  // log 500 errors
  // change the message and date of 500 errors
  if (status == 500 && (node_env == "production" || node_env == "test")) {
    console.log(error);
    message = "Internal server error!";
    data = "No data available";
  }

  res.status(status).json({ message: message, data: data });
};
