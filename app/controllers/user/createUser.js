const { connect, connection } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const User = require('../../models/User')
const { validatePassword } = require('../../utils/modelValidations')

const createUser = async (req, res, next) => {
  const { name, surname, email, password, address, phone } = req.body
  const { street, city, country, zipcode } = address

  if (!name ||
    !surname ||
    !email ||
    !password ||
    !street ||
    !city ||
    !country ||
    !zipcode ||
    !phone) {
    return next(new Error('Required request field not provided'))
  }

  const passwordIsValid = validatePassword(password)

  if (!passwordIsValid) {
    return next(new Error('Password must have 1 lowercase letter, 1 uppercase letter, 1 special character and minimum 8 characters long'))
  }

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      name,
      surname,
      email,
      password: passwordHash,
      address,
      phone,
      orders: [],
      files: []
    })
    const newUser = await user.save()
    const userObjForToken = {
      id: newUser._id,
      email: newUser.email
    }
    const token = jwt.sign(userObjForToken, process.env.JWT_SECRET_KEY)

    res.status(201).send({
      data: newUser,
      accessToken: token
    })
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = { createUser }
