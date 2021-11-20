const { originWhitelist } = require("./config");

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || originWhitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("CORS ERROR: " + origin + " not allowed!"))
    }
  },
  methods: [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS"
  ],
  allowedHeaders: [
    "Origin",
    "Content-Type",
    "Accept",
    "Authorization"
  ],
  exposedHeaders: [
    'Content-Disposition'
  ],
  credentials: true
}

module.exports = corsOptions;