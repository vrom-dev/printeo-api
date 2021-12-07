const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { validateEmail, validatePassword } = require('../utils/modelValidations')

const printerSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: 4,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address']
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    required: true,
    validate: [validatePassword, 'Please fill a valid password']
  },
  companyName: {
    type: String,
    trim: true,
    minlength: 1,
    required: true
  },
  phoneNumber: {
    type: Number,
    minlength: 9
  },
  registeredAt: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true,
    length: 5
  },
  shippingPrice: {
    type: Number,
    required: true,
    minlength: 1
  },
  printingPrice: {
    type: Number,
    required: true,
    minlength: 1
  },
  shippingTime: {
    type: Number,
    required: true,
    minlength: 1
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
})

printerSchema.plugin(uniqueValidator)

printerSchema.set('toJSON', {
  transform: (doc, transformedObject) => {
    transformedObject.id = transformedObject._id
    delete transformedObject._id
    delete transformedObject.__v
    delete transformedObject.password
  }
})

const Printer = model('Printer', printerSchema)

module.exports = Printer
