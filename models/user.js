const express = require('express')
const Schema = express.Schema

const userSchema = new Schema {

  firstName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  createAt: {
    type: Date,
    default: Date.now
  }
}

module.exports = mongoose.model('User', userSchema)