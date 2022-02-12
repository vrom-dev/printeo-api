const Order = require('../../models/Order')
const User = require('../../models/User')
const Printer = require('../../models/Printer')

const getOrder = async (req, res, next) => {
  const { id } = req.params

  try {
    const order = await Order.findById(id).populate('prints')
    const user = await User.findById(order.user)
    const printer = await Printer.findById(order.printer)
    res.status(200).send({
      status: 200,
      data: {
        user,
        order,
        printer
      }
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { getOrder }