const checkAuthToken = async (req, res, next) => {
  const { user } = req

  res.status(200).send({
    status: 200,
    data: {
      id: user._id
    }
  })
}

module.exports = { checkAuthToken }
