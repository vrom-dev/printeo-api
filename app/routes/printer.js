const printerRouter = require('express').Router()

const tokenExtractor = require('../middlewares/tokenExtractor')
const userExtractor = require('../middlewares/userExtractor')
const printerExtractor = require('../middlewares/printerExtractor')

const {
  createPrinter,
  editPrinter,
  loginPrinter,
  getPrinter,
  getPrinterId,
  getAllPrinters
} = require('../controllers/printer')

printerRouter.post('/printer/login', loginPrinter)
printerRouter.post('/printer', createPrinter)

printerRouter.put('/printer/:id',
  tokenExtractor,
  printerExtractor,
  editPrinter
)
printerRouter.get('/printer/token',
  tokenExtractor,
  printerExtractor,
  getPrinterId
)
printerRouter.get('/printer/:id',
  tokenExtractor,
  printerExtractor,
  getPrinter
)

printerRouter.get('/printer',
  tokenExtractor,
  getAllPrinters
)

module.exports = printerRouter