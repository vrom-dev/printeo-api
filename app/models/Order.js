const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentMethod: {
    type: 'String',
    required: true
  },
  prints: [{
    type: Schema.Types.ObjectId,
    ref: 'Print',
    required: true
  }]
})

orderSchema.set('toJSON', {
  transform: (doc, transformedObject) => {
    transformedObject.id = transformedObject._id
    delete transformedObject._id
    delete transformedObject.__v
    delete transformedObject.password
  }
})

const Order = model('Order', orderSchema)

module.exports = Order
