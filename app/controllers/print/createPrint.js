const { connect, connection } = require('mongoose')
require('dotenv').config()

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const Print = require('../../models/Print')
const Printer = require('../../models/Printer')
const File = require('../../models/File')

const createPrint = async (req, res, next) => {
  const {
    color,
    innerPadding,
    accuracy,
    scale,
    price,
    quantity,
    file,
    printer
  } = req.body

  const fileExists = File.findById(file)
  const printerExists = Printer.findById(printer)

  if (!color ||
    !innerPadding ||
    !accuracy ||
    !scale ||
    !price ||
    !quantity ||
    !file ||
    !fileExists ||
    !printerExists) {
    return next(new Error('Required request field not provided'))
  }

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const print = new Print({
      color,
      innerPadding,
      accuracy,
      scale,
      price,
      quantity,
      file,
      printer
    })
    const newPrint = await print.save()
    res.status(201).send({
      data: newPrint
    })
    connection.close()
  } catch (e) {
    connection.close()
    return next(e)
  }
}

module.exports = { createPrint }
