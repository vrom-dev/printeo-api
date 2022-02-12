const Print = require('../../models/Print')

const deletePrint = async (req, res, next) => {
  const { user } = req
  const { id } = req.params

  const print = await Print.findById(id)

  if (!user._id.equals(print.user)) {
    return next(new Error('Token not valid for this request'))
  }

  try {
    await Print.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    res.status(200).send({})
  } catch (e) {
    next(e)
  }
}

module.exports = { deletePrint }