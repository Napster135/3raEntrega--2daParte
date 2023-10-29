const dotenv = require('dotenv')
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MONGOURL: process.env.MONGOURL,
  PERSISTENCE: process.env.PERSISTENCE,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
  nodemailer: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
};
