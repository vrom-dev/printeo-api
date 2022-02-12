const orderRouter = require('express').Router()
const {
  createPaymentSession,
  getAllOrdersByUser,
  getAllOrdersByPrinter,
  editOrderStatus,
  createOrder,
  getOrder
} = require('../controllers/order')

const tokenExtractor = require('../middlewares/tokenExtractor')
const userExtractor = require('../middlewares/userExtractor')
const printerExtractor = require('../middlewares/printerExtractor')

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

orderRouter.put(
  '/order/:id',
  tokenExtractor,
  printerExtractor,
  editOrderStatus
)

orderRouter.get(
  '/order/:id',
  tokenExtractor,
  getOrder
)

orderRouter.get(
  '/order/user/:id',
  tokenExtractor,
  userExtractor,
  getAllOrdersByUser
)

orderRouter.get(
  '/order/printer/:id',
  tokenExtractor,
  printerExtractor,
  getAllOrdersByPrinter
)

module.exports = orderRouter
