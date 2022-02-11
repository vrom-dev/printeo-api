const orderRouter = require('express').Router()
const { createPaymentSession } = require('../controllers/order')
const { createOrder } = require('../controllers/order')

const tokenExtractor = require('../middlewares/tokenExtractor')
const userExtractor = require('../middlewares/userExtractor')

orderRouter.post(
  '/payment',
  tokenExtractor,
  userExtractor,
  createPaymentSession
)
orderRouter.post(
  '/order',
  tokenExtractor,
  userExtractor,
  createOrder
)

module.exports = orderRouter
