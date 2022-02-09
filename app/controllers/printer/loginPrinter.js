const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Printer = require('../../models/Printer')

const loginPrinter = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new Error('Required request field not provided'))
  }

  try {
    const printer = await Printer.findOne({ email })
    const passwordCorrect = printer === null
      ? false
      : await bcrypt.compare(password, printer.password)

    if (!(printer && passwordCorrect)) {
      return next(new Error('Invalid email or password'))
    }

    const printerObjForToken = {
      id: printer._id,
      email: printer.email
    }
    const token = jwt.sign(printerObjForToken, process.env.JWT_SECRET_KEY)

    res.status(200).send({
      status: 200,
      data: {
        accessToken: token
      }
    })

  } catch (e) {

    next(e)
  }
}

module.exports = { loginPrinter }