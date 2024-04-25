require('dotenv').config();

const config = {
  port: process.env.PORT || 3000
}

const configAuth = {
  secret: process.env.AUTH_SECRET || 'secret',
  expires: process.env.AUTH_EXPIRES || '1h',
}


module.exports = { config, configAuth };