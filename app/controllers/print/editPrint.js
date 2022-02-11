const Print = require('../../models/Print')

const editPrint = async (req, res, next) => {
  const { user } = req
  const { id } = req.params

  const print = await Print.findById(id)

  if (!user._id.equals(print.user)) {
    return next(new Error('Token not valid for this request'))
  }

  const { material, innerFill, accuracy, scale } = req.body

  if (!material ||
    !innerFill ||
    !accuracy ||
    !scale ||
    !id) {
    return next(new Error('Required request field not provided'))
  }

  try {
    const fieldsToUpdate = {
      material,
      innerFill: innerFill / 100,
      accuracy,
      scale
    }
    const updatedPrint = await Print.findOneAndUpdate(id, fieldsToUpdate, { new: true })

    res.status(200).send({
      status: 200,
      data: updatedPrint
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { editPrint }