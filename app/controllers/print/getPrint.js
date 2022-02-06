const { connect, connection } = require('mongoose')

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const Print = require('../../models/Print')

const getPrint = async (req, res, next) => {
  const { user } = req
  const { id } = req.params

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const print = await Print.findById(id).populate('file')
    if (!print.user.equals(user._id)) {
      return next(new Error('Token not valid for this request'))
    }
    res.status(200).send({
      status: 200,
      data: print
    })
    connection.close()
  } catch (e) {
    connection.close()
    next(e)
  }
}

module.exports = { getPrint }