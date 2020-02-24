const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    // userId: {type: String, required: true},
    imageName: {type: String},
    imageSource: {type: String},
    contentType: {type: String}
  },
  {
    collection: 'images',
    timestamps: true
  }
);

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Image', schema);
