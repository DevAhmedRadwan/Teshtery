const User = require("../models/user");

module.exports.get = async (req, res, next) => {
  try {
    const { page, pagesize, _id, email, username } = req.query;

    let query = {};
    if (_id) query["_id"] = _id;
    if (email) query["email"] = email;
    if (username) query["username"] = username;

    const users = await User.paginate(query, {
      page: page ? page : 1,
      limit: pagesize ? pagesize : 20,
    });

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports.disable = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.updateOne(
      { _id: userId },
      { disabled: true },
      { new: true }
    );

    res.status(200).json({
      userId: user._id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.enable = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.updateOne(
      { _id: userId },
      { disabled: false },
      { new: true }
    );

    res.status(200).json({
      userId: user._id,
    });
  } catch (err) {
    next(err);
  }
};
