const jwt = require('jsonwebtoken')
const Printer = require('../models/Printer')

const printerExtractor = async (req, res, next) => {
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
    const printer = await Printer.findById(decodedToken.id)
    if (!printer) {
      return next(new Error('Token missing, expired or invalid'))
    }
    req.printer = printer
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = printerExtractor
