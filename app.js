const express = require('express') // include express
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // include method-override

const routes = require('./routes') // include routes
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // use method-override 

app.use(routes) // import routes from modules(index.js)

app.listen(PORT, () => {
  console.log(`app is listening on port http://localhost:${PORT}!`)
})