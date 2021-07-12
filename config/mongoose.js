// include mongoose
const mongoose = require('mongoose')

// connect to mongoose
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

// get connect status
const db = mongoose.connection

// connect error
db.on('error', () => {
  console.log('mongodb error!')
})

// connect success
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db