require('dotenv').config()

module.exports = {
    email: process.env.MAILER_EMAIL,
    password: process.env.MAILER_PASSWORD,
    targetEmail: process.env.MAILER_TARGET,
}