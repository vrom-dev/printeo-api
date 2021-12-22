const { Schema, model } = require('mongoose')

const fileSchema = new Schema({
  url: {
    type: 'String',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  dimensions: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    z: {
      type: Number,
      required: true
    }
  },
  volume: {
    type: Number,
    required: true
  }
},
{ timestamps: true })

fileSchema.set('toJSON', {
  transform: (doc, transformedObject) => {
    transformedObject.id = transformedObject._id
    delete transformedObject._id
    delete transformedObject.__v
  }
})

const File = model('File', fileSchema)

module.exports = File
