const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.message === 'Required request field not provided') {
    return res
      .status(400)
      .send({ error: `${error.message}` })
  }
  if (error.message === 'Invalid username or password') {
    return res
      .status(400)
      .send({ error: `${error.message}` })
  }

  if (error.message === 'User not found') {
    return res
      .status(400)
      .send({ error: `${error.message}` })
  }

  if (error.message === 'Token not valid for this request') {
    return res
      .status(401)
      .send({ error: `${error.message}` })
  }

  return res
    .status(400)
    .send({ error: `${error.message}` })
}

module.exports = errorHandler
