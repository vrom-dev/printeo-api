const stripe = require('stripe')('sk_test_51K49IJJB818ZHWtj3avLNkB4nuWWOjyKP4mqcoZJeIQgzw2lYuK0SEhj8H0bb5hxxgiNZdmyLTTvKf53NkKCWG1x00qgPnixEi')

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 999 // 9.99€
}

const createPaymentSession = async (req, res, next) => {
  const { items } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true
    }
  })
  res.send({
    clientSecret: paymentIntent.client_secret
  })
}

module.exports = { createPaymentSession }
