const express = require('express') // include express
const mongoose = require('mongoose') // include mongoose
const app = express()

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

app.get('/', (req, res) => {
  app.send('hello world!')
})

app.listen(3000, () => {
  console.log('app is listening on port 3000!')
})