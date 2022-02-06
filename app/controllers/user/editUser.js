const User = require('../../models/User')

const editUser = async (req, res, next) => {
  const { user } = req
  const { id } = req.params

  if (!user._id.equals(id)) {
    return next(new Error('Token not valid for this request'))
  }

  const { name, firstSurname, secondSurname, email, address, phone } = req.body
  const { street, city, country, zipcode } = address

  if (!name ||
    !firstSurname ||
    !secondSurname ||
    !email ||
    !street ||
    !city ||
    !country ||
    !zipcode ||
    !phone) {
    return next(new Error('Required request field not provided'))
  }

  try {
    const fieldsToUpdate = {
      name,
      firstSurname,
      secondSurname,
      email,
      address,
      phone,
    }
    const updatedUser = await User.findOneAndUpdate(id, fieldsToUpdate, { new: true })
    res.status(200).send({
      status: 200,
      data: updatedUser
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { editUser }