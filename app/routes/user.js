const userRouter = require('express').Router()
const { createUser, getUser } = require('../controllers/user')

userRouter.post('/user/register', createUser)
userRouter.get('/user/:id', getUser)

module.exports = userRouter
