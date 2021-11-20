const jwt = require('jsonwebtoken');
const { buildError } = require("../common/utilities");
const { tokenEncryptionKey } = require("../config/config");

function checkAndVerifyToken(token, key, req, next) {
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, key, (err, decodedToken) => {
      if (err) {
        next(buildError(403, "Token is not valid", null));
      } else {
        req.user = {
          userId: decodedToken.id,
          email: decodedToken.email,
          username: decodedToken.username
        };
        next();
      }
    });
  } else {
    next(buildError(401, "Token not found try signing in", null));
  }
}

const requireAuth = (req, res, next) => {
  const token = req.get("Authorization");
  checkAndVerifyToken(token, tokenEncryptionKey, req, next);
};

module.exports = { requireAuth };
