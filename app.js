const express = require('express') // include express
const mongoose = require('mongoose') // include mongoose
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  Todo.find() // find data from database
    .lean()  // transfer data into js
    .then(todos => res.render( 'index', { todos })) // render template
    .catch(error => console.log(error)) // show the error
})

app.listen(3000, () => {
  console.log('app is listening on port 3000!')
})