const Printer = require('../../models/Printer')

const getAllPrinters = async (req, res, next) => {
  try {
    const printers = await Printer.find({})
    res.status(200).send({
      status: 200,
      data: printers
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { getAllPrinters }