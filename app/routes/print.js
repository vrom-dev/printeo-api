const printRouter = require('express').Router()

const tokenExtractor = require('../middlewares/tokenExtractor')
const userExtractor = require('../middlewares/userExtractor')

const {
  createPrint,
  getAllPrintsByUser,
  getPrint
} = require('../controllers/print')

printRouter.post('/print',
  tokenExtractor,
  userExtractor,
  createPrint
)

printRouter.get('/print',
  tokenExtractor,
  userExtractor,
  getAllPrintsByUser
)

printRouter.get('/print/:id',
  tokenExtractor,
  userExtractor,
  getPrint
)

module.exports = printRouter
