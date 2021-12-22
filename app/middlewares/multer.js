const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
    const fileName = `${uniqueSuffix}${path.extname(file.originalname)}`
    cb(null, fileName)
  }
})

const upload = multer({
  dest: path.join(__dirname),
  storage,
  limits: {
    fieldNameSize: 300,
    fileSize: 20971520 // 20MB
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /.stl/
    const stlExtension = path.extname(file.originalname).toLowerCase()
    const isSTL = filetypes.test(stlExtension)
    if (isSTL) {
      return cb(null, true)
    } else {
      return cb(new Error('File type not supported'))
    }
  }
})

const multerMiddleware = upload.single('stl')

module.exports = multerMiddleware
