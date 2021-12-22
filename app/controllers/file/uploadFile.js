const fs = require('fs')
const { connect, connection } = require('mongoose')
const { promisify } = require('util')
const unlinkFile = promisify(fs.unlink)

const NodeStl = require('node-stl')

const File = require('../../models/File')
const { uploadFileStream } = require('../../utils/awsBucket')

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')

const uploadFile = async (req, res, next) => {
  if (!req.file) {
    return next(new Error('No file provided'))
  }
  try {
    const result = await uploadFileStream(req.file)
    const stl = await new NodeStl(req.file.path, { density: 1.04 })
    await unlinkFile(req.file.path)
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const file = new File({
      fileName: req.file.originalname,
      url: `/files/download/${result.Key}`,
      dimensions: {
        x: stl.boundingBox[0],
        y: stl.boundingBox[1],
        z: stl.boundingBox[2]
      },
      volume: stl.volume
    })
    const newFile = await file.save()
    connection.close()
    res.status(201).json(newFile)
  } catch (error) {
    return next(error)
  }
}

module.exports = { uploadFile }
