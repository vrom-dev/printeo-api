const Order = require('../../models/Order')
const User = require('../../models/User')
const Print = require('../../models/Print')
const Printer = require('../../models/Printer')

const createOrder = async (req, res, next) => {
  const {
    payment,
    printer,
    prints,
    quantityDetails,
    totalPrice
  } = req.body

  const { user } = req

  if (!printer ||
    !prints ||
    !totalPrice ||
    !payment ||
    !quantityDetails) {
    return next(new Error('Required request field not provided'))
  }

  const printerObj = await Printer.findById(printer)
  const printsList = []

  for await (print of prints) {
    const printObj = await Print.findById(print)
    printsList.push(printObj.id)
  }

  try {
    const order = new Order({
      user: user._id,
      printer: printerObj._id,
      totalPrice,
      payment,
      status: 'paid',
      quantityDetails,
      prints: printsList
    })
    const newOrder = await order.save()
    user.orders = user.orders.concat(newOrder._id)
    await user.save()
    printerObj.orders = printerObj.orders.concat(newOrder._id)
    await printerObj.save()
    res.status(201).send({
      status: 201,
      data: newOrder
    })
  } catch (e) {
    return next(e)
  }
}

module.exports = { createOrder }