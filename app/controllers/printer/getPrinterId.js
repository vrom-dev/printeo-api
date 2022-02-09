const getPrinterId = async (req, res, next) => {
  const { printer } = req

  res.status(200).send({
    status: 200,
    data: {
      id: printer._id
    }
  })
}

module.exports = { getPrinterId }