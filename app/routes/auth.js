const authRouter = require('express').Router()
const { loginUser } = require('../controllers/auth')

authRouter.post('/login', createUser)

module.exports = authRouter
