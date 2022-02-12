const Order = require('../../models/Order')

const getAllOrdersByUser = async (req, res, next) => {
  const { user } = req
  const { id } = req.params

  if (!user._id.equals(id)) {
    return next(new Error('Token not valid for this request'))
  }

  try {
    const orders = await Order.find({ user: user._id })
    res.status(200).send({
      status: 200,
      data: orders
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { getAllOrdersByUser }