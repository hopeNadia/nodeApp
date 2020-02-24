const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    id: {type: String},
    email: {type: String, required: true},
    hash: {type: String, required: true},
    userName: {type: String, required: true},
    avatarUrl: {type: String, required: false}
  },
  {
    collection: 'users'
  }
);

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('User', schema);
