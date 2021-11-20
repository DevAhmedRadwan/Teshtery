const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const { isEmail } = require("validator");

const { tokenMaxAge, tokenEncryptionKey } = require("../config/config");

function createToken(data, age, key) {
  return jwt.sign(data, key, {
    expiresIn: age,
  });
}

module.exports.signin = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    let user = null;
    if (isEmail(id)) user = await Admin.loginWithMail(id, password);
    else user = await Admin.loginWithUsername(id, password);
    const token = createToken(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      tokenMaxAge,
      tokenEncryptionKey
    );
    res.status(200).json({
      userId: user._id,
      email: user.email,
      username: user.username,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.signout = async (req, res, next) => {
  try {
    res.status(200).clearCookie("refreshToken").send();
  } catch (err) {
    next(err);
  }
};
