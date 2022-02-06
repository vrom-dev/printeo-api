const jwt = require('jsonwebtoken')
const User = require('../models/User')

const userExtractor = async (req, res, next) => {
  const { token } = req
  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
  } catch (e) {
    next(e)
  }
  if (!token || !decodedToken?.id) {
    return next(new Error('Token missing, expired or invalid'))
  }
  try {
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return next(new Error('Token missing, expired or invalid'))
    }
    req.user = user
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = userExtractor
