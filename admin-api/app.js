const cors = require("cors");
const express = require("express");
const cookieParser = require('cookie-parser');

const routes = require("./routes/routes");
const corsOptions = require("./config/cors");
const generalErrorHandler = require("./middleware/error-handling/general-error-handler");
const mongooseErrorHandler = require("./middleware/error-handling/mongoose-error-handler");

// init express
const app = express();

// disabling express default headers
app.disable('x-powered-by');

// init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

// adding routes
app.use("/", routes);

// init error handling middlewares
app.use(mongooseErrorHandler);
app.use(generalErrorHandler);

// export app
module.exports = app;
