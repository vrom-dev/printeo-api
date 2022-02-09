const getPrinter = async (req, res, next) => {
  const { printer } = req
  const { id } = req.params

  if (!printer._id.equals(id)) {
    return next(new Error('Token not valid for this request'))
  }

  try {
    res.status(200).send({
      status: 200,
      data: printer
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { getPrinter }