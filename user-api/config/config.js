// parse environment variables
module.exports = {
  node_env: process.env.NODE_ENV,
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  originWhitelist: process.env.ORIGINS_WHITELIST,
  tokenEncryptionKey: process.env.TOKEN_ENCRYPTION_KEY,
  tokenMaxAge: parseInt(process.env.TOKEN_MAX_AGE),
  db_uri: process.env.DB_URI,
  admin_user_name: process.env.ADMIN_USER_NAME,
  admin_user_e_mail: process.env.ADMIN_USER_E_MAIL,
  admin_user_password: process.env.ADMIN_USER_PASSWORD
};
