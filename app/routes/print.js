const printRouter = require('express').Router()

const tokenExtractor = require('../middlewares/tokenExtractor')
const userExtractor = require('../middlewares/userExtractor')

const {
  createPrint,
  getAllPrintsByUser,
  getPrint,
  editPrint
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
  getPrint
)

printRouter.put('/print/:id',
  tokenExtractor,
  userExtractor,
  editPrint
)

module.exports = printRouter
