const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isDone: { // define what the checkbox default is 
    type: Boolean,
    default: true
  }
})
module.exports = mongoose.model('Todo', todoSchema)