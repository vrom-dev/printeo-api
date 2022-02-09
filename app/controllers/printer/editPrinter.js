const Printer = require('../../models/Printer')

const editPrinter = async (req, res, next) => {
  const { printer } = req
  const { id } = req.params

  if (!printer._id.equals(id)) {
    return next(new Error('Token not valid for this request'))
  }

  const { companyName, printingPrice, shippingTime, shippingPrice, email, address } = req.body
  const { street, city, country, zipcode } = address

  if (!companyName ||
    !printingPrice ||
    !shippingTime ||
    !shippingPrice ||
    !email ||
    !street ||
    !city ||
    !country ||
    !zipcode) {
    return next(new Error('Required request field not provided'))
  }

  try {
    const fieldsToUpdate = {
      companyName,
      printingPrice,
      shippingTime,
      shippingPrice,
      email,
      address
    }
    const updatedPrinter = await Printer.findByIdAndUpdate(id, fieldsToUpdate, { new: true })
    res.status(200).send({
      status: 200,
      data: updatedPrinter
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { editPrinter }