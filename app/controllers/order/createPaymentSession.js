const { STRIPE_KEY } = require('../../config')
const stripe = require('stripe')(STRIPE_KEY)

const calculateOrderAmount = (items) => {
  const { totalPrice } = items
  return Math.round(totalPrice * 100)
}

const createPaymentSession = async (req, res, next) => {
  const { items } = req.body
  const { user } = req

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true
    },
    receipt_email: user.email
  })
  res.send({
    clientSecret: paymentIntent.client_secret
  })
}

module.exports = { createPaymentSession }
