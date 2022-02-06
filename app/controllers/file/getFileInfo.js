const File = require('../../models/File')

const getFileInfo = async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return next(new Error('Required request field not provided'))
  }
  try {
    const file = await File.findById(id)
    if (!file) {
      return next(new Error('Requested data not found'))
    }
    res.status(200).send(file)
  } catch (e) {
    next(e)
  }
}

module.exports = { getFileInfo }
