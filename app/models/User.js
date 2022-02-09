const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { validateEmail } = require('../utils/modelValidations')

const userSchema = new Schema({
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
  firstSurname: {
    type: String,
    trim: true,
    minlength: 1,
    required: true
  },
  secondSurname: {
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
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  prints: [{
    type: Schema.Types.ObjectId,
    ref: 'Print'
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
