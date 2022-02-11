const { createPrint } = require('./createPrint')
const { getAllPrintsByUser } = require('./getAllPrintsByUser')
const { getPrint } = require('./getPrint')
const { editPrint } = require('./editPrint')
const { deletePrint } = require('./deletePrint')

module.exports = {
  createPrint,
  getAllPrintsByUser,
  getPrint,
  editPrint,
  deletePrint
}
