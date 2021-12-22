const { getFileStream } = require('../../utils/awsBucket')

const getFile = async (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)
  readStream.pipe(res)
}

module.exports = { getFile }
