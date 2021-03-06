const userRouter = require('express').Router()

const tokenExtractor = require('../middlewares/tokenExtractor')
const userExtractor = require('../middlewares/userExtractor')

const {
  createUser,
  getUser,
  loginUser,
  editUser,
  getUserId
} = require('../controllers/user')

userRouter.post('/user/register', createUser)
userRouter.post('/user/login', loginUser)
userRouter.get('/user/token',
  tokenExtractor,
  userExtractor,
  getUserId
)
userRouter.get('/user/:id',
  tokenExtractor,
  userExtractor,
  getUser
)
userRouter.put('/user/:id',
  tokenExtractor,
  userExtractor,
  editUser
)

module.exports = userRouter
