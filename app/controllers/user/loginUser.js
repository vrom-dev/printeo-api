const { connect, connection } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const User = require('../../models/User')

const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new Error('Required request field not provided'))
  }

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)

    const user = await User.findOne({ email })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
      return next(new Error('Invalid username or password'))
    }

    const userObjForToken = {
      id: user._id,
      email: user.email
    }
    const token = jwt.sign(userObjForToken, process.env.JWT_SECRET_KEY)

    res.status(200).send({
      status: 200,
      data: {
        accessToken: token
      }
    })
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = { loginUser }