const Admin = require("../models/admin");
const {
  admin_user_name,
  admin_user_e_mail,
  admin_user_password,
} = require("./config");

module.exports.addDefaultAdmin = async () => {
  const admin = await Admin.find({
    email: admin_user_e_mail,
    username: admin_user_name,
  });
  if(admin.length > 0)
    return "Defualt admin was found initialized!";
  const newAdmin = await Admin.create({
    email: admin_user_e_mail,
    username: admin_user_name,
    password: admin_user_password,
  });
  if(newAdmin)
    return "Defualt admin was initialized";
  return "Failed to initialize the defualt admin";
};
