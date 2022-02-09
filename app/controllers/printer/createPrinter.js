const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const Printer = require('../../models/Printer')
const { validatePassword } = require('../../utils/modelValidations')

const createPrinter = async (req, res, next) => {
  const { companyName, printingPrice, shippingTime, shippingPrice, email, address, password } = req.body
  const { street, city, country, zipcode } = address

  if (!companyName ||
    !printingPrice ||
    !shippingTime ||
    !shippingPrice ||
    !email ||
    !password ||
    !street ||
    !city ||
    !country ||
    !zipcode) {
    return next(new Error('Required request field not provided'))
  }

  const passwordIsValid = validatePassword(password)

  if (!passwordIsValid) {
    return next(new Error('Password must have 1 lowercase letter, 1 uppercase letter, 1 special character and minimum 8 characters long'))
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const printer = new Printer({
      companyName,
      printingPrice,
      shippingPrice,
      shippingTime,
      email,
      password: passwordHash,
      address,
      orders: []
    })
    const newPrinter = await printer.save()
    const printerObjForToken = {
      id: newPrinter._id,
      email: newPrinter.email
    }
    const token = jwt.sign(printerObjForToken, process.env.JWT_SECRET_KEY)

    res.status(201).send({
      status: 201,
      data: {
        accessToken: token
      }
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { createPrinter }
