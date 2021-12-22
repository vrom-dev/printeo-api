const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { validateEmail, validateUsername } = require('../utils/modelValidations')

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: 4,
    unique: true,
    required: true,
    validate: [validateUsername, 'Please fill a valid username']
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
  name: {
    type: String,
    trim: true,
    minlength: 1,
    required: true
  },
  surname: {
    type: String,
    trim: true,
    minlength: 1,
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
  isPrinter: {
    type: Boolean,
    default: false
  },
  printerConfig: {
    shippingPrice: {
      type: Number,
      minlength: 1
    },
    printingPrice: {
      type: Number,
      minlength: 1
    },
    shippingTime: {
      type: Number,
      minlength: 1
    }
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  files: [{
    type: Schema.Types.ObjectId,
    ref: 'File'
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
