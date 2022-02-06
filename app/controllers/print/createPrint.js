const { connect, connection } = require('mongoose')
require('dotenv').config()

const { MONGODB_CONFIG, MONGODB_URI } = require('../../config')
const Print = require('../../models/Print')
const File = require('../../models/File')

const createPrint = async (req, res, next) => {
  const {
    material,
    innerFill,
    accuracy,
    scale,
    file
  } = req.body

  const { user } = req

  const fileExists = File.findById(file)

  if (!material ||
    !innerFill ||
    !accuracy ||
    !scale ||
    !file ||
    !fileExists) {
    return next(new Error('Required request field not provided'))
  }

  try {
    await connect(MONGODB_URI, MONGODB_CONFIG)
    const print = new Print({
      material,
      innerFill: innerFill / 100,
      accuracy,
      scale,
      file: file.id,
      user: user._id
    })
    const newPrint = await print.save()
    res.status(201).send({
      status: 201,
      data: newPrint
    })
    user.prints = user.prints.concat(newPrint._id)
    await user.save()
    connection.close()
  } catch (e) {
    connection.close()
    return next(e)
  }
}

module.exports = { createPrint }
