const Print = require('../../models/Print')

const getPrint = async (req, res, next) => {
  const { id } = req.params

  try {
    const print = await Print.findById(id).populate('file')
    res.status(200).send({
      status: 200,
      data: print
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { getPrint }