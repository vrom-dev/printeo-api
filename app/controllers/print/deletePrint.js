const Print = require('../../models/Print')
const File = require('../../models/File')

const deletePrint = async (req, res, next) => {
  const { user } = req
  const { id } = req.params

  const print = await Print.findById(id)

  if (!user._id.equals(print.user)) {
    return next(new Error('Token not valid for this request'))
  }

  try {
    await Print.findByIdAndDelete(id)
    await File.findByIdAndDelete(print.file)

    res.status(204).send({
      status: 204,
      data: deletedPrint
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { deletePrint }