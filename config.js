const dotenv = require ('dotenv'); 
dotenv.config (); 

const config = {
  port: process.env.PORT || 8084,
  allowedOrigins: process.env.LOCATION.split(','),
  secret: process.env.JWT_SECRET || 'secreto-de-la-api-fakebook'
}

module.exports = config;