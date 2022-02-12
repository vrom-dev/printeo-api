const Order = require('../../models/Order')

const editOrderStatus = async (req, res, next) => {
  const { printer } = req
  const { id } = req.params

  const order = await Order.findById(id)

  if (!printer._id.equals(order.printer)) {
    return next(new Error('Token not valid for this request'))
  }

  const { status } = req.body

  if (!status || !id) {
    return next(new Error('Required request field not provided'))
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true })

    res.status(200).send({
      status: 200,
      data: updatedOrder
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { editOrderStatus }