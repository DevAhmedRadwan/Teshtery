const path = require("path");
const { node_env, host, port } = require("./config");

module.exports = (app, doc_route) => {
  if (node_env == "development") {
    const swaggerJsDoc = require("swagger-jsdoc");
    const swaggerUI = require("swagger-ui-express");

    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "jwt-auth",
          version: "1.0.0",
          description: "jwt-auth api routes documentation",
        },
        servers: [
          {
            url: `http://${host}:${port}`,
            description: "jwt-auth api",
          },
        ],
      },
      apis: [
        path.join(__dirname, "../swagger/**/*.yaml"),
      ],
    };

    const specs = swaggerJsDoc(options);

    app.use(doc_route, swaggerUI.serve, swaggerUI.setup(specs));
  }
}
