const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')

const User = require('../../models/User')

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const user = User.findOne({ email })
  } catch (e) {

  }
}
