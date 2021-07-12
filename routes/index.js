// include express and express router
const express = require('express')
const router = express.Router()

// import router modules
const home = require('./modules/home') // import home.js from modules
const todos = require('./modules/todos')
router.use('/', home) // if request path is /, using the code from home.js
router.use('/todos', todos)

// export router modules
module.exports = router