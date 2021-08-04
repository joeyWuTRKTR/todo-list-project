// include express and express router
const express = require('express')
const router = express.Router()

// import router modules
const home = require('./modules/home') // import home.js from modules
const todos = require('./modules/todos')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) // if request path is /, using the code from home.js

// export router modules
module.exports = router