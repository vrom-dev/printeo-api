const { Schema, model } = require('mongoose')

const printSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  printer: {
    type: Schema.Types.ObjectId,
    ref: 'Printer'
  },
  color: {
    type: String,
    required: true
  },
  innerPadding: {
    type: Number,
    enum: [0.5, 0.8, 1],
    required: true
  },
  accuracy: {
    type: String,
    required: true
  },
  scale: {
    type: Number,
    min: 0.1,
    max: 1.5,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  shippingPrice: {
    type: Number,
    required: true
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }
})

printSchema.set('toJSON', {
  transform: (doc, transformedObject) => {
    transformedObject.id = transformedObject._id
    delete transformedObject._id
    delete transformedObject.__v
    delete transformedObject.password
  }
})

const Print = model('Print', printSchema)

module.exports = Print
