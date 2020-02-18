const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  userId: {type: String, required: true},
  fileUrl: {type: String},
  fileSource: {type: String},
  creationDate: {type: Date, required: true},
  updateDate: {type: Date}
});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Image', schema);
