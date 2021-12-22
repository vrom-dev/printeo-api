const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  printer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  shippingPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'received'],
    default: 'pending'
  },
  prints: [{
    type: Schema.Types.ObjectId,
    ref: 'Print',
    required: true
  }]
},
{ timestamps: true }
)

orderSchema.set('toJSON', {
  transform: (doc, transformedObject) => {
    transformedObject.id = transformedObject._id
    delete transformedObject._id
    delete transformedObject.__v
  }
})

const Order = model('Order', orderSchema)

module.exports = Order
