const Order = require('../../models/Order')

const getAllOrdersByPrinter = async (req, res, next) => {
  const { printer } = req
  const { id } = req.params

  if (!printer._id.equals(id)) {
    return next(new Error('Token not valid for this request'))
  }

  try {
    const orders = await Order.find({ printer: printer._id })
    res.status(200).send({
      status: 200,
      data: orders
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { getAllOrdersByPrinter }