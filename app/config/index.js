require('dotenv').config()
const { MONGODB_CONFIG, MONGODB_URI } = require('./mongo')
const { STRIPE_KEY } = require('./stripe')

const PORT = process.env.PORT || 3003

module.exports = {
  MONGODB_CONFIG,
  MONGODB_URI,
  PORT,
  STRIPE_KEY
}
