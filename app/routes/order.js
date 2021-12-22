const orderRouter = require('express').Router()
const { createPaymentSession } = require('../controllers/order')

orderRouter.post('/payment', createPaymentSession)
module.exports = orderRouter
