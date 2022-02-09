const { createPrinter } = require('./createPrinter')
const { editPrinter } = require('./editPrinter')
const { loginPrinter } = require('./loginPrinter')
const { getPrinter } = require('./getPrinter')
const { getPrinterId } = require('./getPrinterId')
const { getAllPrinters } = require('./getAllPrinters')

module.exports = {
  createPrinter,
  editPrinter,
  loginPrinter,
  getPrinter,
  getPrinterId,
  getAllPrinters
}
