const getUser = async (req, res, next) => {
  const { user } = req
  const { id } = req.params

  if (!user._id.equals(id)) {
    return next(new Error('Token not valid for this request'))
  }

  try {
    res.status(200).send({
      status: 200,
      data: user
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { getUser }
