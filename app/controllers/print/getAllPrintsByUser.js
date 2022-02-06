const { connect, connection } = require('mongoose')

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const Print = require('../../models/Print')

const getAllPrintsByUser = async (req, res, next) => {
  const { user } = req

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const prints = await Print.find({ user: user._id }).populate('file')

    res.status(200).send({
      status: 200,
      data: prints
    })
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = { getAllPrintsByUser }
