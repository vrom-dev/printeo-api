const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const { validatePassword } = require('../../utils/modelValidations')

const createUser = async (req, res, next) => {
  const { name, firstSurname, secondSurname, email, password, address, phone } = req.body
  const { street, city, country, zipcode } = address

  if (!name ||
    !firstSurname ||
    !secondSurname ||
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
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      name,
      firstSurname,
      secondSurname,
      email,
      password: passwordHash,
      address,
      phone,
      orders: [],
      prints: []
    })
    const newUser = await user.save()
    const userObjForToken = {
      id: newUser._id,
      email: newUser.email
    }
    const token = jwt.sign(userObjForToken, process.env.JWT_SECRET_KEY)

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

module.exports = { createUser }
