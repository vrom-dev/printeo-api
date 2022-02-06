const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { validateEmail, validateUsername } = require('../utils/modelValidations')

const printerSchema = new Schema({
  brandName: {
    type: String,
    trim: true,
    minlength: 1,
    required: true
  },
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
    required: true
  },
  printingPrice: {
    type: Number,
    enum: ['1/2', '2/4', '3/6'],
    required: true
  },
  shippingPrice: {
    Number,
    required: true
  },
  deliveryTime: {
    Number,
    required: true
  },
  phone: {
    type: Number,
    minlength: 9
  },
  address: {
    street: {
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
    zipcode: {
      type: Number,
      required: true,
      length: 5
    }
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
},
  { timestamps: true })

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (doc, transformedObject) => {
    transformedObject.id = transformedObject._id
    delete transformedObject._id
    delete transformedObject.__v
    delete transformedObject.password
  }
})

const User = model('User', userSchema)

module.exports = User
