const mongoose = require('mongoose') // include mongoose
const Todo = require('../todo')

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
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name' + i })
  }
  console.log('done.')
})