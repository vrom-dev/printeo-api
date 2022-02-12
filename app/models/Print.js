const { Schema, model } = require('mongoose')

const printSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  innerFill: {
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
  file: {
    type: Schema.Types.ObjectId,
    ref: 'File'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  isDeleted: {
    type: Boolean,
    default: false
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
