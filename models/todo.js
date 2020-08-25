const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const TodoSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  action: {
    type: String,
    required: [true, 'The todo text field is required'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  timeline: {
    type: String,
    required: false,
  },
});

//create model for todo
const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;
