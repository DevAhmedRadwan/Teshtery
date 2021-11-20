const Admin = require("../models/admin");

module.exports.create = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const admin = await Admin.create({ email, username, password });
    res.status(201).json({
      adminId: admin._id,
    });
  } catch (err) {
    next(err);
  }
};
