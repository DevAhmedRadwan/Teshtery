const http = require("http");

const app = require("./app");
const mongoDB = require("./config/mongodbORM");
const { addDefaultAdmin } = require("./config/add-default-admin");
const swagger = require("./config/swagger");
const { host, port } = require("./config/config");

// connect to mongoDB
mongoDB
.then(() => {
  console.log("Database connection succeeded");
  addDefaultAdmin()
  .then((msg) => {
    console.log(msg)
  })
})
.catch((err) => {
  console.log("Database connection failed!!!");
});

// init swagger
swagger(app, "/doc");

// construct the server
const server = http.createServer(app);

// start server
server.listen(port, host, function () {
  console.log(`App listening on http://${host}:${port}`);
});
