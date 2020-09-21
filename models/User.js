const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Users
const TodoSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
});

//create model for user
module.exports = mongoose.model('user', TodoSchema);
