// include express and express router
const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  return res.render('login')
})

module.exports = router