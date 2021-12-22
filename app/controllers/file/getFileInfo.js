const { connect, connection } = require('mongoose')

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const File = require('../../models/File')

const getFileInfo = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return next(new Error('Required request field not provided'))
  }

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const file = await File.findById(id)

    if (!file) {
      return next(new Error('Requested data not found'))
    }
    res.status(200).send(file)
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = { getFileInfo }
