const express = require('express') // include express
const mongoose = require('mongoose') // include mongoose
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')
const methodOverride = require('method-override') // include method-override

const routes = require('./routes') // include routes
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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // use method-override 
app.use(routes) // import routes from modules(index.js)

app.listen(3000, () => {
  console.log('app is listening on port 3000!')
})