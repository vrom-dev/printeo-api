const Print = require('../../models/Print')

const getAllPrintsByUser = async (req, res, next) => {
  const { user } = req

  try {
    const prints = await Print.find({ user: user._id, isDeleted: false }).populate('file')
    res.status(200).send({
      status: 200,
      data: prints
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { getAllPrintsByUser }
