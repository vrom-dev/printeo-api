const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  printer: {
    type: Schema.Types.ObjectId,
    ref: 'Printer'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  payment: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['paid', 'sent', 'received'],
    default: 'paid',
    required: true
  },
  quantityDetails: {
    type: Schema.Types.Mixed,
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
