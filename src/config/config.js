const dotenv = require('dotenv')
dotenv.config()

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URI,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  PERSISTENCE: process.env.PERSISTENCE,
  nodemailer: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
}

module.exports = config
