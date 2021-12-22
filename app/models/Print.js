const { Schema, model } = require('mongoose')

const printSchema = new Schema({
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
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  file: {
    type: Schema.Types.ObjectId,
    ref: 'File'
  },
  printer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{ timestamps: true }
)

printSchema.set('toJSON', {
  transform: (doc, transformedObject) => {
    transformedObject.id = transformedObject._id
    delete transformedObject._id
    delete transformedObject.__v
  }
})

const Print = model('Print', printSchema)

module.exports = Print
