const filesRouter = require('express').Router()
const {
  getFile,
  uploadFile,
  getFileInfo
} = require('../controllers/file')
const multerMiddleware = require('../middlewares/multer')

filesRouter.get('/files/download/:key', getFile)
filesRouter.get('/files/:id', getFileInfo)
filesRouter.post('/files',
  multerMiddleware,
  uploadFile
)

module.exports = filesRouter
