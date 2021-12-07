const errorHandler = (error, req, res, next) => {
  if (error.message === 'Required request field not provided') {
    return res
      .status(400)
      .send({ error: `${error.message}` })
  }

  return res
    .status(400)
    .send({ error: `${error.message}` })
}

module.exports = errorHandler
