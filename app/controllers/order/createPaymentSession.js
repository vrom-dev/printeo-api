const stripe = require('stripe')('sk_test_51KRfbxJzeLnk59jCPJ9xXrFqDMEfs5vd4GddpPgfkQH93epGkKkRIGmFJ7jLn3ct5IqRMhF5HqeUWmoZZd6JADk6004vSd2yh2')

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
